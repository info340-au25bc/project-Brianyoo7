import React from 'react';

function CollectionEdit(props) {
    if (!collection) return null; // nothing to edit

  return (
    <div className="collection-edit">
      <h2>Edit Collection: {collection.title}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(collection.id, {
            title: e.target.title.value,
            description: e.target.description.value,
          });
        }}
      >
        <label>
          Title:
          <input name="title" defaultValue={collection.title} />
        </label>
        <label>
          Description:
          <textarea name="description" defaultValue={collection.description} />
        </label>
        <div className="edit-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CollectionEdit;