import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
// import { useLoaderData } from '@remix-run/react';

import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, {links as notesList} from '~/components/NotesList';
import { getStoredNotes, storeNotes } from '~/data/notes';

export default function NotesPage() {
  let notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...

  if(noteData.title.trim().length < 5){
    return { message: 'Invalid title - must be at least 5 characters long.' };
  }
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect('/notes');
}

export async function loader(){
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }
  return notes;
}

export function links() {
  return [...newNoteLinks(), ...notesList()];
}