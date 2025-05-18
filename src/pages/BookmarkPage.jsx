import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { theme } from "../constants/theme";
import styled from "styled-components";
import BmkCard from "../components/Bookmark/BmkCard";
import BmkCardModal from "../components/Bookmark/BmkCardModal";
import { getBookmarkedJobs, getBookmarkedJobById } from "../api/feature/Bookmark/bookmarkJob";
import { getBookmarkedEducations, getBookmarkedEducationById } from "../api/feature/Bookmark/bookmarkEducation";
import { getBookmarkedPolicies, getBookmarkedPolicyById } from "../api/feature/Bookmark/bookmarkPolicy";

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

  // 북마크 데이터 가져오기
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        let response;
        if (topic === "job") {
          response = await getBookmarkedJobs();
        } else if (topic === "education") {
          response = await getBookmarkedEducations();
        } else if (topic === "policy") {
          response = await getBookmarkedPolicies();
        } else {
          setBookmarks([]);
          return;
        }

        if (response && response.data) {
          setBookmarks(response.data.result);
          setFiltered(response.data.result);
        } else {
          setBookmarks([]);
        }
      } catch (error) {
        console.error("북마크 데이터를 불러오는 중 오류 발생:", error);
        setBookmarks([]);
      }
    };

    fetchBookmarks();
  }, [topic]);

  // 검색 및 정렬
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

  const handleCardClick = async (id) => {
    try{
      let result;
      if(topic === "job") {
          const res = await getBookmarkedJobById(id);
          result = res.data.result;
      } else if(topic === "education") {
          const res = await getBookmarkedEducationById(id);
          result = res.data.result;
      } else if(topic === "policy") {
          const res = await getBookmarkedPolicyById(id);
          result = res.data.result;
      }

      if(result) { setSelectedCard(result); }
    } catch (error) {
      console.error("북마크 카드 클릭 중 오류:", error);
    }
  };
  
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
          <BmkCard
            key={card.id}
            topic={topic}
            data={card}
            onClick={()=>handleCardClick(card.id)}
          />
        ))}
      </CardGrid>

      {selectedCard && (
        <BmkCardModal
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