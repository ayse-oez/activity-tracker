import './BottomSheet.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const BottomSheet = ({ isOpen, onClose }: Props) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="bottomSheet">
        <div className="bottomSheetContent">Bottom Sheet Content</div>

        <div className="footer">
          <button className="saveButton" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
