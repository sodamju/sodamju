import React, { useState } from 'react';
import MemberJoin from './MemberJoin';
import MemberJoin2 from './MemberJoin2';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
        ageGroup:'',
        level: '',
    });

    //다음 단계로 이동
    const nextStep = () => {
        setStep(step +1);
        console.log(formData);
    };

    //회원 가입 최종 제출
    const handleSubmit = () => {
        console.log('Form Data:', formData);
        //서버에 제출하는 로직 추가
    }

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