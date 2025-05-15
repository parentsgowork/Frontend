// RegionDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const educations = [
  {
    label: "고졸",
    description: "고등학교 졸업",
    icon: "🎓",
  },
  {
    label: "전문대졸",
    description: "전문대학 졸업",
    icon: "🏛️",
  },
  {
    label: "대졸",
    description: "대학교 졸업",
    icon: "🎓",
  },
  {
    label: "석사",
    description: "석사 학위",
    icon: "🏅",
  },
  {
    label: "박사",
    description: "박사 학위",
    icon: "👨‍🎓",
  },
];

const eduMap = {
  "고졸": "HIGH_SCHOOL",
  "전문대졸": "ASSOCIATE",
  "대졸": "BACHELOR",
  "석사": "MASTER",
  "박사": "DOCTOR",
}

const Educationdown = ({ selected, onChange }) => {
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

    const handleSelect = (educationLabel) => {
      const mappedValue = eduMap[educationLabel];
      onChange(mappedValue);
      setIsOpen(false);
    }

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownButton type = "button" onClick={() => setIsOpen((prev) => !prev)}>
                {selected || "최종 학력을 선택해주세요"}
            </DropdownButton>
            {isOpen && (
                <DropdownMenu>
                    {educations.map((education) => (
                        <OptionButton
                            key={education.label}
                            type="button"
                            onClick={() => handleSelect(education.label)}
                            selected={selected === education.label}
                        >
                            <Icon>{education.icon}</Icon>
                            <TextGroup>
                                <Title>{education.label}</Title>
                                <Description>{education.description}</Description>
                            </TextGroup>
                        </OptionButton>
                    ))}
                </DropdownMenu>
            )}
        </DropdownWrapper>
    );
};

export default Educationdown;

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

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color: ${({ selected }) => (selected ? "#e8f0fe" : "#fff")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#d2e3fc" : "#f5f5f5")};
  }
`;

const Icon = styled.span`
  font-size: 20px;
  margin-right: 12px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Description = styled.span`
  font-size: 13px;
  color: #777;
`;

