import React, { useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../../services/studentApi';
import ConfirmationModal from '../common/ConfirmationModal';

const ShowList = () => {
    const [students, setStudents] = useState([]); 
    const [loading, setLoading] = useState(false);
    
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        age: '',
        gender: ''
    });

    const [modal, setModal] = useState({
        isOpen: false,
        type: '', 
        title: '',
        body: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const handleGetList = async () => {
        alert("학생정보를 조회하시겠습니까?");
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!inputs.id) {
            alert("삭제할 학생의 ID를 입력하세요.");
            return;
        }
        if (window.confirm(`ID ${inputs.id} 학생을 정말 삭제하시겠습니까??`)) {
            try {
                await deleteStudent(inputs.id);
                alert("삭제가 완료되었습니다.");
                handleGetList(); // 목록 새로고침
                setInputs({ id: '', name: '', age: '', gender: '' });
            } catch (e) {

            }
        }
    };

    const handleOpenAddModal = () => {
        if (!inputs.name || !inputs.age) {
            alert("추가할 학생의 이름과 나이를 입력하세요.");
            return;
        }
        setModal({
            isOpen: true,
            type: 'create',
            title: '학생을 추가하시겠습니까?',
            body: `[추가할 정보]\n이름: ${inputs.name}\n나이: ${inputs.age}\n성별: ${inputs.gender}`
        });
    };

    const handleOpenUpdateModal = () => {
        if (!inputs.id || !inputs.name || !inputs.age) {
            alert("수정할 학생의 ID, 이름, 나이를 입력하세요.");
            return;
        }
        setModal({
            isOpen: true,
            type: 'update',
            title: '학생정보를 수정하시겠습니까?',
            body: `ID ${inputs.id} 학생의 정보를 다음으로 수정합니다:\n이름: ${inputs.name}\n나이: ${inputs.age}\n성별: ${inputs.gender}`
        });
    };

    const handleModalClose = () => {
        setModal({ isOpen: false, type: '', title: '', body: '' });
    };

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
            
            handleModalClose();
            handleGetList(); 
            setInputs({ id: '', name: '', age: '', gender: '' });

        } catch (e) {

        }
    };

    return (
        <div className="container mt-4">
            <h1>🔥학생정보 관리🔥</h1>
            <h3>입력한 학생 목록들</h3>
            
            {}
            <div id="div_list1" className="p-3 mb-2 bg-light border">
                {loading && <p>로딩 중...</p>}
                {!loading && students.length === 0 && <p>조회된 학생이 없습니다.</p>}
                {!loading && students.map(s => (
                    <div key={s.id}>{`${s.id} : ${s.name} (${s.age}, ${s.gender || "미입력"})`}</div>
                ))}
            </div>

            {}
            <button className="btn btn-info m-1" onClick={handleGetList}>학생 목록 조회</button>
            <button className="btn btn-primary m-1" onClick={handleOpenAddModal}>학생 입력하기</button>
            <button className="btn btn-warning m-1" onClick={handleOpenUpdateModal}>학생 수정하기</button>
            <button className="btn btn-danger m-1" onClick={handleDelete}>학생 삭제하기</button>
            
            <hr />

            {}
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

            {}
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
