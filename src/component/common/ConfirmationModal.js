// src/component/common/ConfirmationModal.js
import React from 'react';

// 부트스트랩 모달 구조를 JSX로 변환
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, body }) => {
    // isOpen이 false면 아무것도 렌더링하지 않음
    if (!isOpen) return null;

    return (
        // 모달을 강제로 띄우기 위한 클래스 및 스타일
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* body에 HTML 렌더링이 필요할 경우 dangerouslySetInnerHTML 사용 */}
                        <p>{body}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        {/* 확인 버튼 클릭 시 onConfirm 함수 실행 */}
                        <button type="button" className="btn btn-primary" onClick={onConfirm}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;