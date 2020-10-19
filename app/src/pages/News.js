import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { Pane, Card, Heading, Paragraph, Text, Image, Button } from "evergreen-ui";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = useQuery();
  const topic = query.get("topic");

  let { path } = useRouteMatch();

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      console.log("Fetching news");

      let url = "http://localhost:3001/news/";

      if (topic) {
        url += `?topic=${topic}`;
      }

      try {
        const response = await axios.get(url);

        setNewsList(response.data);
      } catch (e) {
        console.log("error fetching news,", e);
      }

      setIsLoading(false);
    }

    fetchNews();
  }, [topic]);

  const topics = [
    { to: path, text: "Alla" },
    { to: `${path}?topic=Allmänt`, text: "Allmänt" },
    { to: `${path}?topic=Presidentvalet`, text: "Presidentvalet" },
    { to: `${path}?topic=Corona`, text: "Corona" },
  ];

  return (
    <Pane>
      <Heading size={900}>Nyheter</Heading>
      <Pane>
        {topics.map(({ to, text }, i) => (
          <NavLink
            key={i}
            isActive={(match, location) => location.pathname + location.search === to}
            to={to}
            style={{
              marginRight: "15px",
              padding: "5px",
              textDecoration: "none",
              fontSize: "20px",
            }}
            activeStyle={{
              background: "black",
              color: "white",
            }}
          >
            {text}
          </NavLink>
        ))}
      </Pane>
      {isLoading || (
        <Pane display="flex" flexDirection="column" flexFlow="wrap">
          {newsList.map((item) => (
            <Card
              key={item.id}
              elevation={1}
              width={300}
              marginTop="20px"
              marginRight="20px"
              padding="10px"
            >
              <Link to={`/nyheter/${item.slug}`} style={{ textDecoration: "none" }}>
                <Pane>
                  <Pane position="relative" display="flex">
                    <Image src={item.image} width="100%" />
                    <Pane position="absolute" bottom={2} right={2} paddingX={5} background="white">
                      <Text>{item.topic}</Text>
                    </Pane>
                  </Pane>
                  <Heading size={600}>{item.title}</Heading>
                  <Paragraph>{item.teaser}</Paragraph>
                  <Text>{new Date(Date.parse(item.created)).toLocaleDateString()}</Text>
                </Pane>
              </Link>
            </Card>
          ))}
        </Pane>
      )}
    </Pane>
  );
}
