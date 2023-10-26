import { FC, ReactElement, ReactNode } from "react";
import { Modal } from "antd";

type Props = {
  modalVisible: boolean;
  cancelText: string;
  okText: string;
  title: string;
  slot: ReactNode;
  closeModal: (visible: boolean) => void;
  resetStatus: () => void;
  confirm: () => void;
};

const GModel: FC<Props> = ({
  slot,
  modalVisible,
  closeModal,
  okText,
  cancelText,
  title,
  resetStatus,
  confirm,
}): ReactElement => {
  const handleCancel = () => {
    resetStatus();
    closeModal(false);
  };

  const handleConfirm = () => {
    confirm();
    closeModal(false);
  };

  return (
    <Modal
      title={title}
      open={modalVisible}
      onCancel={handleCancel}
      onOk={handleConfirm}
      cancelText={cancelText}
      okText={okText}
    >
      {slot}
    </Modal>
  );
};

export default GModel;
