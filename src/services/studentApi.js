const API_URL = "https://6915405284e8bd126af93912.mockapi.io/user/";

// [R] Read
export const getStudents = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("목록 조회 실패");
        return await response.json();
    } catch (error) {
        console.error("GET Error:", error);
        alert(error.message);
        return [];
    }
};

// [C] Create
export const createStudent = async (data) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("학생 추가 실패");
        return await response.json();
    } catch (error) {
        console.error("POST Error:", error);
        alert(error.message);
        throw error; // 에러를 다시 던져서 모달이 닫히지 않게 할 수 있음
    }
};

// [U] Update
export const updateStudent = async (id, data) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("학생 수정 실패");
        return await response.json();
    } catch (error) {
        console.error("PUT Error:", error);
        alert(error.message);
        throw error;
    }
};

// [D] Delete
export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("학생 삭제 실패");
        return response.json();
    } catch (error) {
        console.error("DELETE Error:", error);
        alert(error.message);
        throw error;
    }
};