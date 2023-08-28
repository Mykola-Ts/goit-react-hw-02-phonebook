import PropTypes from 'prop-types';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { NoContactsText } from './Contacts.styled';

export const Contacts = ({
  contacts,
  visibleContacts,
  onDelete,
  onFilterContacts,
}) => {
  return (
    <>
      {!contacts.length && <NoContactsText>No contacts</NoContactsText>}
      {contacts.length > 0 && (
        <>
          <Filter onFilterContacts={onFilterContacts} />
          <ContactList contacts={visibleContacts} onDelete={onDelete} />
          {!visibleContacts.length && (
            <NoContactsText>
              No contacts found for the entered name
            </NoContactsText>
          )}
        </>
      )}
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  visibleContacts: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFilterContacts: PropTypes.func.isRequired,
};
