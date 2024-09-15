import React, { useState } from 'react';
import axios from 'axios';
import MemberJoin from './MemberJoin';
import MemberJoin2 from './MemberJoin2';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
        ageGroup: '',
        level: '',
    });

    // 다음 단계로 이동
    const nextStep = () => {
        setStep(step + 1);
        console.log(formData);
    };

    // 회원 가입 최종 제출
    const handleSubmit = () => {
        // 백엔드로 회원가입 데이터를 전송
        axios.post('/api/users/signup', formData)
            .then((response) => {
                console.log('회원가입 성공:', response.data);
                // 회원가입 성공 후 처리 (예: 로그인 페이지로 이동)
            })
            .catch((error) => {
                console.error('회원가입 실패:', error);
                // 에러 처리 (예: 사용자에게 알림)
            });
    };

    // 현재 단계에 맞는 컴포넌트 렌더링
    switch (step) {
        case 1:
            return <MemberJoin formData={formData} setFormData={setFormData} nextStep={nextStep} />;
        case 2:
            return <MemberJoin2 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />;
        default:
            return <MemberJoin formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    }
};

export default Signup;
