import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../constants/theme";
import styled from "styled-components";
import ResumeCard from "../components/Resume/ResumeCard";
import ResumeCardModal from "../components/Resume/ResumeCardModal";
import { getUserResumes } from "../api/feature/Resume/resumeApi";

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const navigate = useNavigate(); 

  // 북마크 데이터 가져오기
  useEffect(() => {
    const fetchResumes = async () => { 
        try {
            const response = await getUserResumes();
            if (response) {
            setResumes(response);
            setFiltered(response);
            } else {
            setResumes([]);
            }
        } catch (error) {
            console.error("북마크 데이터 가져오기 오류:", error);
        }
        }
    fetchResumes();
  }, []);

  // 검색 및 정렬
  useEffect(() => {
    const result = [...resumes]
      .filter(card => card.title.includes(searchKeyword))
      .sort((a, b) => {
        if (sortOrder === "latest") {
          return new Date(b.date) - new Date(a.date);
        } else {
          return new Date(a.date) - new Date(b.date);
        }
      });
    setFiltered(result);
  }, [searchKeyword, sortOrder, resumes]);

  const handleCardClick = async (data) => {
    setSelectedCard(data)
  };
  
  const handleModalClose = () => setSelectedCard(null);

  return (
    <Container>
      <h2>자기소개서</h2>
      <p>저장된 자기소개서를 관리하세요.</p>

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
          <ResumeCard
            data={card}
            onClick={(data)=>handleCardClick(data)}
          />
        ))}
      </CardGrid>

      {selectedCard && (
        <ResumeCardModal
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

export default ResumePage;

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