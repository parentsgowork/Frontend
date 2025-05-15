// RegionDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const regions = [
  {
    label: "수도권",
    options: ["서울", "경기", "인천"],
  },
  {
    label: "강원권",
    options: ["강원"],
  },
  {
    label: "충청권",
    options: ["대전", "세종", "충북"],
  },
];

const regionMap = {
  "서울": "SEOUL",
  "경기": "GYEONGGI",
  "인천": "INCHEON",
  "강원": "GANGWON",
  "대전": "DAEJEON",
  "세종": "SEJONG",
  "충북": "CHUNGBUK",
};

const RegionDropdown = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 바깥 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (regionLabel) => {
      const mappedValue = regionMap[regionLabel];
      onChange(mappedValue);
      setIsOpen(false);
    };

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownButton type = "button" onClick={() => setIsOpen((prev) => !prev)}>
                {selected || "거주 지역을 선택해주세요"}
            </DropdownButton>
            {isOpen && (
                <DropdownMenu>
                    {regions.map((group) => (
                        <Group key={group.label}>
                            <GroupLabel>{group.label}</GroupLabel>
                            <ButtonRow>
                            {group.options.map((region) => (
                                <RegionButton
                                    key={region}
                                    type="button"
                                    selected={selected === region}
                                    onClick={() => handleSelect(region)}
                                >
                                {region}
                                </RegionButton>
                            ))}
                            </ButtonRow>
                        </Group>
                    ))}
                </DropdownMenu>
            )}
        </DropdownWrapper>
    );
};

export default RegionDropdown;

// styled-components
const DropdownWrapper = styled.div`
    position: relative; 
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

const DropdownButton = styled.button`
//   width: 100%;
  height: 25px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Regular';
  text-align: left;
  background-color: white;
  cursor: pointer;
  box-sizing: content-box;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  margin-top: 4px;
  padding: 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const GroupLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const RegionButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#1976d2" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#1565c0" : "#e0e0e0")};
  }
`;
