import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import PropTypes from 'prop-types';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { calculatePoints } from '@utils/index';
import constants from '@utils/constants';
import style from './style';
import { useDataContext } from '@contexts/DataContext';

const ModalEdit = ({
  onModalValid,
  onClose,
  openModal,
}) => {
  const { positionData } = useDataContext();

  const [modalInstance, setModalInstance] = useState(null);
  const [skittlesForEditMode, setSkittlesForEditMode] = useState(Array.from({ length: 12 },
    (position = constants.POSITION.UPRIGHT, value) => ({ value: value + 1, position })));
  const [editedPoints, setEditedPoints] = useState(0);

  const onInit = async (instance) => {
    await setModalInstance(instance);
  };

  const onValid = () => {
    onModalValid(editedPoints);
  };

  const onSkittlesChange = (data) => {
    const knockedSkittles = data
      .filter((item) => item.position === constants.POSITION.KNOCKED_OVER);
    setEditedPoints(calculatePoints(knockedSkittles));
  };

  useEffect(() => {
    setSkittlesForEditMode(openModal ? positionData : []);
    openModal && modalInstance && modalInstance.open();
  }, [openModal]);

  return (
    (
      <Modal
        id="modal-edit"
        onInit={onInit}
        onCloseEnd={onClose}
        s
        title="Choose the knocked over pins"
        footer={(
          <>
            <Button style={{ display: 'inline-block', width: 'auto', margin: 0 }} className="modal-close waves-effect waves-green btn-flat" onClick={() => {}}>Cancel</Button>
            <Button style={{ display: 'inline-block', width: 'auto', margin: 0 }} className="modal-close waves-effect waves-green btn-flat" onClick={onValid}>Valid</Button>
          </>
        )}
      >
        <div>
          <SkittlesDisplay
            style={{ width: '80%', margin: '1rem auto 0 auto' }}
            editMode
            skittles={skittlesForEditMode}
            onChange={onSkittlesChange}
          />
          <p className="z-depth-1" style={style.points}>{editedPoints}</p>
        </div>
      </Modal>
    )
  );
};

ModalEdit.propTypes = {
  onModalValid: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openModal: PropTypes.bool,
};

ModalEdit.defaultProps = {
  openModal: false,
};

export default ModalEdit;
