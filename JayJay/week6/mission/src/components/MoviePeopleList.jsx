import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import API_KEY from "../../config/secrets";

const PeopleList = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr); // 8열 그리드
  gap: 20px; // 각 항목 간격
  padding: 20px;
`;

const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  text-align: center;
`;

const PersonImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const PersonName = styled.h3`
  font-size: medium;
  margin-top: 5px;
`;

const PersonRole = styled.p`
  font-size: small;
`;

export default function MoviePeopleList({ movieId }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

      try {
        const response = await axios.get(url);
        const combinedPeople = response.data.cast.concat(response.data.crew);

        // Check for duplicate IDs and handle them
        const uniquePeople = combinedPeople.map((person, index) => ({
          ...person,
          uniqueId: person.id + "-" + index,
        }));

        setPeople(uniquePeople);
        setError(null);
      } catch (error) {
        console.error("Fetching movie credits failed: ", error);
        setError("출연진 및 제작진 정보를 불러오는 중에 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [movieId]);

  if (loading) {
    return <div>로딩 중입니다..</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PeopleList>
      {people.map((person) => (
        <PersonCard key={person.uniqueId}>
          <PersonImage
            src={
              person.profile_path
                ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"
            }
            alt={person.name}
          />
          <PersonName>{person.name}</PersonName>
          <PersonRole>{person.job || person.character}</PersonRole>
        </PersonCard>
      ))}
    </PeopleList>
  );
}
