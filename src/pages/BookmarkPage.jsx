import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theme } from "../constants/theme";
import styled from "styled-components";
import InfoCard from "../components/Chat/InfoCard";
import CardModal from "../components/Chat/CardModal";
// import getBookmarks from "../api/getBookmarks"; 

const topicNameMap = {
  job: {
    title: "채용 정보",
    description: "저장된 채용 정보를 관리하세요.",
  },
  education: {
    title: "교육 정보",
    description: "저장된 교육 정보를 관리하세요.",
  },
  policy: {
    title: "고용정책/복지 정보",
    description: "저장된 정책 정보를 관리하세요.",
  },
  resume: {
    title: "자기소개서",
    description: "저장된 자기소개서를 관리하세요.",
  },
};


const BookmarkPage = () => {
  const { topic } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

    const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBookmarks = async () => {
      // 실제 API 연결 시 주석 해제
      // const response = await getBookmarks(topic);
      // setBookmarks(response.data);

      // 임시 mock 데이터
      const mock = [
        { id: 1, title: "웹 개발자 구직 정보", description: "프론트엔드 개발자 포지션에 지원하기 위한 정보입니다.", url: "https://example.com", date: "2025-05-01" },
        { id: 2, title: "백엔드 개발자 구직 정보", description: "Java 및 Spring 프레임워크 경험이 있는 백엔드 개발자 포지션입니다.", url: "https://example.com", date: "2025-04-25" },
        { id: 3, title: "UX/UI 디자이너 채용 공고", description: "3년 이상 경력의 UX/UI 디자이너를 찾고 있는 회사 정보입니다.", url: "https://example.com", date: "2025-04-28" }
      ];
      setBookmarks(mock);
    };

    fetchBookmarks();
  }, [topic]);

  useEffect(() => {
    const result = [...bookmarks]
      .filter(card => card.title.includes(searchKeyword))
      .sort((a, b) => {
        if (sortOrder === "latest") {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
    setFiltered(result);
  }, [searchKeyword, sortOrder, bookmarks]);

  const handleCardClick = (card) => setSelectedCard(card);
  const handleModalClose = () => setSelectedCard(null);

  return (
    <Container>
      <h2>{topicNameMap[topic]?.title || "구직정보"}</h2>
      <p>{topicNameMap[topic]?.description || "저장된 구직정보를 관리하세요."}</p>

      <SearchSortWrapper>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <SortSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </SortSelect>
      </SearchSortWrapper>

      <CardGrid>
        {filtered.map((card) => (
          <InfoCard
            key={card.id}
            topic={topic}
            data={card}
            isBookmark={true}
            onClick={handleCardClick}
          />
        ))}
      </CardGrid>

      {selectedCard && (
        <CardModal
          topic={topic}
          card={selectedCard}
          onClose={handleModalClose}
        />
      )}

        <FloatingButton onClick={() => navigate('/chatbot')}>
            💬
        </FloatingButton>
    </Container>
  );
};

export default BookmarkPage;

// 스타일
const Container = styled.div`
  padding: 24px;
  width: 90%;
`;

const SearchSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 12px;
`;

const SortSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const FloatingButton = styled.button`
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: black;
    color: white;
    border: none;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-size: 28px;
    z-index: 999; // 항상 최상단
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: ${theme.colors.primaryDark || '#388E3C'};
    }
`;