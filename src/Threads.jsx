import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const URL = 'https://scrap-back.onrender.com'

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
  </div>
);

const mockThreads = [
  {
    id: 1,
    title: "React Hooks: Best Practices",
    description:
      "What are your favorite React hooks and how do you use them effectively? Share your experiences with useState, useEffect, and custom hooks in building complex components. Also, any tips on performance optimization?",
    author: "Alice",
  },
  {
    id: 2,
    title: "CSS-in-JS vs. Traditional CSS",
    description:
      "Pros and cons of using CSS-in-JS libraries compared to traditional CSS approaches? Let's discuss the impact on performance, scalability, and developer experience. Do you prefer styled-components, emotion, or sticking with plain CSS?",
    author: "Bob",
  },
  {
    id: 3,
    title: "TypeScript vs JavaScript",
    description:
      "Is it worth switching from JavaScript to TypeScript for large-scale projects? How does TypeScript improve code quality and maintainability? Share your migration stories and whether the benefits outweighed the learning curve.",
    author: "Charlie",
  },
];

export function ThreadSearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState(mockThreads);
  const [loading, setLoading] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL}/search-posts/`,
        {
          query: searchQuery,
        }
      );
      setThreads(response.data.posts);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate network delay for demonstration
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(
        `${URL}/search-posts/`,
        {
          query: searchQuery,
        }
      );
      setThreads(response.data.posts);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExpand = (id) => {
    setExpandedThreads((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const maxLength = 1000; // Maximum characters before truncation

  return (
    <div className="container">
      <h1 className="title">Thread Search</h1>
      <form className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </form>
      {loading && <Loader />}
      {!loading && threads.length === 0 && <p>No threads found.</p>}
      {!loading && threads.length > 0 && (
        <div className="thread-list">
          {threads.map((thread) => {
            const isExpanded = expandedThreads[thread.id];
            const fullText = thread.description;
            const shouldTruncate = fullText.length > maxLength;
            const displayText =
              shouldTruncate && !isExpanded
                ? fullText.substring(0, maxLength) + "..."
                : fullText;

            return (
              <div key={thread.id} className="thread-card">
                <div className="thread-card-header">
                  <h2 className="thread-title">{thread.title}</h2>
                  <div className="thread-meta">Posted by {thread.author}</div>
                </div>
                <div className="thread-card-content">
                  <p>{displayText}</p>
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpand(thread.id)}
                      className="read-more-button"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
