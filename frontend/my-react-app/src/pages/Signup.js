import React, { useState } from 'react';
import MemberJoin from './MemberJoin';
import MemberJoin2 from './MemberJoin2';
import axiosInstance from '../api/myApi'; // axiosInstance import
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
        ageGroup:'',
        level: '',
    });

    const navigate = useNavigate();

    //다음 단계로 이동
    const nextStep = () => {
        setStep(step +1);
        console.log(formData);
    };

    //회원 가입 최종 제출
    const handleSubmit = async () => {
        console.log('Form Data:', formData);

        try {
            // 재사용 가능한 axiosInstance로 API 요청
            const response = await axiosInstance.post('/members/signup', formData);

            if (response.status === 200) {
                console.log('회원가입 성공:', response.data);
                // 회원가입 성공 후 페이지이동
                navigate('/login');
            } else {
                console.error('회원가입 실패');
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    //현재 단계에 맞는 컴포넌트 렌더링
    switch (step) {
        case 1 : 
            return <MemberJoin formData={formData} setFormData={setFormData} nextStep={nextStep} />;
        case 2 :
            return <MemberJoin2 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />;
        default :
            return <MemberJoin formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
};

export default Signup;