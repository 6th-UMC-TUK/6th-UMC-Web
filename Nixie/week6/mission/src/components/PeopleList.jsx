import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const apiKey = "c0a4b7aef77457356f4a9a10d17eb3ff";

const PeopleList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));  
  gap: 20px;
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
  width: 80px;
  height: 80px;
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

  useEffect(() => {
    const fetchPeople = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;

      const response = await axios.get(url);
      setPeople(response.data.cast.concat(response.data.crew));
    };

    fetchPeople();
  }, [movieId]);

  return (
    <PeopleList>
      {people.map((person, index) => (
        <PersonCard key={person.id + "-" + index}>
          <PersonImage
            src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : "/path/to/default/image.png"}
            alt={person.name}
          />
          <PersonName>{person.name}</PersonName>
          <PersonRole>{person.job || person.character}</PersonRole>
        </PersonCard>
      ))}
    </PeopleList>
  );
}
