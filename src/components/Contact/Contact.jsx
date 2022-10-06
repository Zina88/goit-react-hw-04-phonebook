import PropTypes from 'prop-types';
import IconButton from 'components/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import css from './Contact.module.css';

const Contact = ({ name, number, onDeleteContact }) => (
    <>
      <p>{name}</p>
      <p>{number}</p>
      <IconButton>
        <DeleteIcon className={css.delIcon} width="20" height="20" onClick={onDeleteContact} />
      </IconButton>
    </>
  );

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};