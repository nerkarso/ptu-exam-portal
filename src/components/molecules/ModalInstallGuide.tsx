import React from 'react';

import Modal from './Modal';

const ModalInstallGuide: React.FC<any> = ({ ...props }) => {
  return (
    <Modal
      title="iOS Installation Guide"
      actions={[
        {
          title: 'Done',
          onClick: props.onDismiss,
          type: 'secondary'
        }
      ]}
      {...props}
    >
      <ol style={{ lineHeight: 1.5 }}>
        <li>
          Tap on <b>Share</b> in the bottom toolbar
        </li>
        <li>
          Look for <b>Add to Home Screen</b>
        </li>
        <li>
          Finish and <b>Add</b>
        </li>
      </ol>
    </Modal>
  );
};

export default ModalInstallGuide;
