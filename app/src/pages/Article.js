import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Article() {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();
  console.log("slug", slug);

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:3001/resolveUrl/${slug}`);

        console.log(response);
        setArticle(response.data);
      } catch (e) {
        console.log("error fetching article", e);
      }

      setIsLoading(false);
    }

    fetchArticle();
  }, [slug]);

  return isLoading ? (
    <div>Hämtar artikel...</div>
  ) : (
    <article>
      <h1>{article.title}</h1>
      <span>{article.created}</span>
      <p>{article.text}</p>
      <p>{article.author}</p>
    </article>
  );
}
