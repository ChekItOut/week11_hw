// src/component/Pages/ShowList.js
import React, { useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../services/studentApi';
import ConfirmationModal from '../common/ConfirmationModal';

const ShowList = () => {
    // 1. 상태(State) 관리
    const [students, setStudents] = useState([]); // 학생 목록
    const [loading, setLoading] = useState(false);
    
    // 입력 필드 상태 (기존 HTML의 input 태그들을 React 상태로 관리)
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        age: '',
        gender: ''
    });

    // 모달 상태 관리
    const [modal, setModal] = useState({
        isOpen: false,
        type: '', // 'add' 또는 'update'
        title: '',
        body: ''
    });

    // 2. 이벤트 핸들러: 입력 필드 값 변경 시
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    // 3. API 함수 (CRUD)
    
    // [R] 목록 조회
    const handleGetList = async () => {
        alert("학생정보를 조회하시겠습니까?"); // 기존 로직 유지
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setLoading(false);
    };

    // [D] 삭제
    const handleDelete = async () => {
        if (!inputs.id) {
            alert("삭제할 학생의 ID를 입력하세요.");
            return;
        }
        // 삭제는 기존 로직(confirm) 유지
        if (window.confirm(`ID ${inputs.id} 학생을 정말 삭제하시겠습니까??`)) {
            try {
                await deleteStudent(inputs.id);
                alert("삭제가 완료되었습니다.");
                handleGetList(); // 목록 새로고침
                setInputs({ id: '', name: '', age: '', gender: '' }); // 입력 필드 초기화
            } catch (e) {
                // API 서비스에서 이미 alert 처리됨
            }
        }
    };

    // [C/U] 모달 열기 핸들러 (API 호출 전)
    
    // 추가 버튼 클릭 시 -> 확인 모달 열기
    const handleOpenAddModal = () => {
        if (!inputs.name || !inputs.age) {
            alert("추가할 학생의 이름과 나이를 입력하세요.");
            return;
        }
        setModal({
            isOpen: true,
            type: 'create', // 모달이 '추가' 모드임을 알림
            title: '학생을 추가하시겠습니까?',
            body: `[추가할 정보]\n이름: ${inputs.name}\n나이: ${inputs.age}\n성별: ${inputs.gender}`
        });
    };

    // 수정 버튼 클릭 시 -> 확인 모달 열기
    const handleOpenUpdateModal = () => {
        if (!inputs.id || !inputs.name || !inputs.age) {
            alert("수정할 학생의 ID, 이름, 나이를 입력하세요.");
            return;
        }
        setModal({
            isOpen: true,
            type: 'update', // 모달이 '수정' 모드임을 알림
            title: '학생정보를 수정하시겠습니까?',
            body: `ID ${inputs.id} 학생의 정보를 다음으로 수정합니다:\n이름: ${inputs.name}\n나이: ${inputs.age}\n성별: ${inputs.gender}`
        });
    };

    // 4. 모달 이벤트 핸들러 (API 호출)

    // 모달 닫기
    const handleModalClose = () => {
        setModal({ isOpen: false, type: '', title: '', body: '' });
    };

    // 모달 "Save changes" 클릭 시 (실제 C/U 실행)
    const handleModalConfirm = async () => {
        const data = { name: inputs.name, age: inputs.age, gender: inputs.gender };
        
        try {
            if (modal.type === 'create') {
                await createStudent(data);
                alert("학생 추가가 완료되었습니다.");
            } else if (modal.type === 'update') {
                await updateStudent(inputs.id, data);
                alert("학생 수정이 완료되었습니다.");
            }
            
            handleModalClose(); // 모달 닫기
            handleGetList(); // 목록 새로고침
            setInputs({ id: '', name: '', age: '', gender: '' }); // 입력 필드 초기화

        } catch (e) {
            // API 서비스에서 오류를 alert 처리하므로 여기서는 추가 작업 불필요
            // 단, 성공 시에만 모달이 닫히게 하려면 이 로직을 try 블록 안으로 이동
        }
    };


    // 5. JSX 렌더링 (기존 HTML 구조와 유사하게)
    return (
        <div className="container mt-4">
            <h1>🔥학생정보 관리🔥</h1>
            <h3>입력한 학생 목록들</h3>
            
            {/* [R] 목록 표시 영역 */}
            <div id="div_list1" className="p-3 mb-2 bg-light border">
                {loading && <p>로딩 중...</p>}
                {!loading && students.length === 0 && <p>조회된 학생이 없습니다.</p>}
                {!loading && students.map(s => (
                    <div key={s.id}>{`${s.id} : ${s.name} (${s.age}, ${s.gender || "미입력"})`}</div>
                ))}
            </div>

            {/* 기능 버튼들 */}
            <button className="btn btn-info m-1" onClick={handleGetList}>학생 목록 조회</button>
            <button className="btn btn-primary m-1" onClick={handleOpenAddModal}>학생 입력하기</button>
            <button className="btn btn-warning m-1" onClick={handleOpenUpdateModal}>학생 수정하기</button>
            <button className="btn btn-danger m-1" onClick={handleDelete}>학생 삭제하기</button>
            
            <hr />

            {/* 입력 필드들 */}
            <div className="card p-3">
                <div className="mb-2">
                    id : <input type="text" id="id" className="form-control" value={inputs.id} onChange={handleInputChange} placeholder="수정/삭제 시 ID 입력"/>
                </div>
                <div className="mb-2">
                    name : <input type="text" id="name" className="form-control" value={inputs.name} onChange={handleInputChange} />
                </div>
                <div className="mb-2">
                    age : <input type="number" id="age" className="form-control" value={inputs.age} onChange={handleInputChange} />
                </div>
                <div className="mb-2">
                    gender : <input type="text" id="gender" className="form-control" value={inputs.gender} onChange={handleInputChange} />
                </div>
            </div>

            {/* [C/U] 확인 모달 (조건부 렌더링) */}
            <ConfirmationModal 
                isOpen={modal.isOpen}
                title={modal.title}
                body={modal.body}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />
        </div>
    );
};

export default ShowList;