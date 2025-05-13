import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RegionDropdown from "../components/SignUp/RegionDropdown";
import EducationDropdown from "../components/SignUp/EducationDropdown";
import sendEmailVerification from "../api/feature/Auth/sendEmailVerification";
import confirmEmailVerification from "../api/feature/Auth/confirmEmailVerification";
import signupWithEmail from "../api/feature/Auth/signupWithEmail";

const SignupForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        isVerified: false,
        email: "",
        name: "",
        password: "",
        age: 0,
        gender: "", // "MALE" | "FEMALE"
        region: "",
        job: "",
        career: 0,
        finalEdu: "", // "HIGH_SCHOOL" | "ASSOCIATE" | "BACHELOR" | "MASTER" | "DOCTOR"
    });

    const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
    const [authCode, setAuthCode] = useState("");

    // 공통 인풋 변경 처리
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    // 슬라이더 변경 처리
    const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    };

    // 성별 선택 처리
    const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
    };

    // 이메일 인증번호 전송
    const handleSendAuthCode = async () => {
        if(!formData.email) {
            alert("이메일을 입력해주세요.");
            return;
        }
        try {
            await sendEmailVerification(formData.email, "SIGNUP");
            setIsAuthCodeSent(true);
        } catch {
            console.log("인증 코드 전송 실패: ", formData)
        }
        
    };

    // 이메일 인증번호 확인
    const handleConfirmAuthCode = async () => {
        if(!authCode) {
            alert("인증번호를 입력해주세요.");
            return;
        }
        try {
            await confirmEmailVerification(formData.email, authCode);
            setFormData((prev) => ({
                ...prev,
                isVerified: true,
            }));
            alert("인증번호가 확인되었습니다.");
        } catch {
            alert("인증번호가 일치하지 않습니다.");
            console.log("인증 코드 확인 실패: ", formData)
        }
    };

    // 회원가입 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.isVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        try {
            console.log("회원가입 요청 데이터:", formData);
            const response = await signupWithEmail(formData);
            console.log("회원가입 성공 응답:", response);
            navigate("/login");
        } catch {
            console.log("회원가입 실패: ", formData)
        }

    };

    return (
    <PageWrapper>
        <FormContainer onSubmit={handleSubmit}>
            <Section>
                <FormLabel>이메일<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <FormInput 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="이메일을 입력해주세요" 
                        required 
                        type="email"
                    />
                    <AuthCodeButton type="button" onClick = {handleSendAuthCode}>인증번호 받기</AuthCodeButton>
                </FormRow>
                {isAuthCodeSent && (
                    <FormRow style={{marginTop: '10px'}}>
                        <FormInput 
                            name="authCode" 
                            value={authCode} 
                            onChange={(e) => setAuthCode(e.target.value)} 
                            placeholder="인증번호 6자리 입력" 
                            required 
                        />
                        <AuthCodeButton 
                            type="button" 
                            onClick={handleConfirmAuthCode}
                            style={{backgroundColor: '#2563EB', color: 'white'}}
                        >
                            확인
                        </AuthCodeButton>
                    </FormRow>
                )}
            </Section>

            <Section>
                <FormLabel>이름<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <FormInput 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="이름을 입력해주세요" 
                        required />
                </FormRow>  
            </Section>

            <Section>
                <FormLabel>나이<span style={{color: 'red'}}>*</span>   {formData.age}세</FormLabel>
                <FormRow>
                    <RangeInput 
                        type="range" 
                        name="age" 
                        min="0" 
                        max="100" 
                        value={formData.age} 
                        onChange={(e) => handleSliderChange("age", parseInt(e.target.value))}/>
                </FormRow>
            </Section>

            <Section>
                <FormLabel>성별<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <GenderButton 
                        type="button" 
                        onClick={() => handleGenderSelect("MALE")} 
                        className={`flex-1 border px-2 py-1 rounded ${formData.gender === "남성" ? "bg-blue-100" : "bg-white"}`}
                    >
                            남성
                    </GenderButton>
                    <GenderButton 
                        type="button" 
                        onClick={() => handleGenderSelect("여성")} 
                        className={`flex-1 border px-2 py-1 rounded ${formData.gender === "여성" ? "bg-blue-100" : "bg-white"}`}
                    >
                        여성
                    </GenderButton>
                </FormRow>
            </Section>

            <Section>
                <FormLabel>거주지역<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <RegionDropdown
                        selected={formData.region}
                        onChange={(region) => setFormData({ ...formData, region })}
                    />
                </FormRow>
            </Section>

            <Section>
                <FormLabel>직업<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <FormInput 
                        name="job" 
                        value={formData.job} 
                        onChange={handleChange} 
                        placeholder="직업을 입력해주세요" 
                        required 
                    />
                </FormRow>
            </Section>

            <Section>
                <FormLabel>경력 연차<span style={{color: 'red'}}>*</span>   {formData.experience}년</FormLabel>
                <FormRow>
                    <RangeInput 
                        type="range" 
                        name="career" 
                        min="0" 
                        max="40" 
                        value={formData.career} 
                        onChange={(e) => handleSliderChange("career", parseInt(e.target.value))} />
                </FormRow>
            </Section>

            <Section>
                <FormLabel>최종학력<span style={{color: 'red'}}>*</span></FormLabel>
                <FormRow>
                    <EducationDropdown
                        selected={formData.finalEdu}
                        onChange={(education) => setFormData({ ...formData, finalEdu: education })}
                    />
                </FormRow>
            </Section>

            <BottomText>
                계정이 없으신가요? <JoinLink to="/signup">회원가입</JoinLink>
            </BottomText>
            <SubmitButton type="submit">가입하기</SubmitButton>
        </FormContainer>
    </PageWrapper>
    );
};

export default SignupForm;

const PageWrapper = styled.div`
    width: 100%;
    padding: 40px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #F9FAFB;
`;

const FormContainer = styled.form`
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    width: 700px;
    max-width: 500px;
`;

const Section = styled.section`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 24px;
`;

const FormLabel = styled.label`
    // font-weight: 600;
    display: block;
    margin-bottom: 15px;
    font-family: 'Regular';
`;

const FormInput = styled.input`
    width: 100%;
    height: 25px;
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Regular';
    box-sizing: content-box;
`;

const RangeInput = styled.input`
    width: 100%;
`;

const SelectedOption = styled.select`
    width: 100%;
    padding: 10px 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
`;

const FormRow = styled.div`
    display: flex;
    gap: 10px;
`;

const AuthCodeButton = styled.button`
    width: 180px;
    padding: 10px 14px;
    border: none;
    border-radius: 6px;
    background-color: #e9ecef;
    cursor: pointer;
    font-weight: 500;
    font-family: 'Regular';
    color: #707070;
`;

const GenderButton = styled.button`
    flex: 1;
    padding: 10px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: ${props => props.selected ? '#cce5ff' : 'white'};
    cursor: pointer;
    font-weight: 500;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #1a73e8;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 20px;
`;

const BottomText = styled.div`
  margin-top: 1.2rem;
  font-size: 0.9rem;
  text-align: center;
`;
