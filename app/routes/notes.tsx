import NewNotes, {links as NewNoteStyles} from "~/components/NewNote"
export default function NotesPage() {
    return (
      <main>
        <NewNotes/>
      </main>
    );
  }

  export function links() : any {
    return [...NewNoteStyles()]
  }