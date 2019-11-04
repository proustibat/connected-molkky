import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hasIn from 'lodash/hasIn';

const Modal = ({
  id, children, onInit, title, footer, onCloseEnd, styleTitle,
}) => {
  const [instance, setInstance] = useState(null);

  useLayoutEffect(() => {
    if (hasIn(global, 'M.Modal.init')) {
      const modalInstance = global.M.Modal.init(document.querySelector(`#${id}`), {
        onCloseEnd,
        dismissible: false,
      });
      setInstance(modalInstance);
    }
    return () => {
      if (hasIn(global, 'M.Modal.getInstance')) {
        const modalInstance = global.M.Modal.getInstance(document.querySelector(`#${id}`));
        modalInstance && modalInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    instance && onInit(instance);
  }, [instance]);

  return (
    <div id={id} className="modal modal-fixed-footer">
      <div className="modal-content">
        {title && <h2 style={{ ...{ borderLeft: '1rem solid', borderRight: '1rem solid' }, ...styleTitle }}>{title}</h2>}
        {children}
      </div>
      {footer && <div className="modal-footer">{footer}</div>}
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onInit: PropTypes.func.isRequired,
  onCloseEnd: PropTypes.func,
  title: PropTypes.string,
  footer: PropTypes.node,
  styleTitle: PropTypes.object,
};

Modal.defaultProps = {
  title: null,
  footer: null,
  onCloseEnd: null,
  styleTitle: {},
};

export default Modal;
