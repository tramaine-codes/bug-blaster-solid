import { For, Show, createEffect, createSignal } from "solid-js";
import {
  addTicket,
  clearEditingTicket,
  editingTicket,
  updateTicket,
} from "../stores/ticketStore";

export default function TicketForm() {
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [priority, setPriority] = createSignal<"1" | "2" | "3">("1");

  createEffect(() => {
    const ticket = editingTicket();

    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
    } else {
      clearForm();
    }
  });

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const ticket = editingTicket();

    if (ticket) {
      updateTicket({
        id: ticket.id,
        title: title(),
        description: description(),
        priority: priority(),
      });
    } else {
      addTicket({
        id: new Date().toISOString(),
        title: title(),
        description: description(),
        priority: priority(),
      });
    }

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} class="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title()}
          class="form-input"
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description()}
          class="form-input"
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <fieldset class="priority-fieldset">
        <legend>Priority</legend>

        <For each={Object.entries(priorityLabels)}>
          {([value, label]) => (
            <label class="priority-label">
              <input
                type="radio"
                value={value}
                checked={priority() === value}
                class="priority-input"
                onChange={(e) => setPriority(e.target.value as "1" | "2" | "3")}
              />
              {label}
            </label>
          )}
        </For>
      </fieldset>

      <button type="submit" class="button">
        Submit
      </button>

      <Show when={editingTicket()}>
        <button
          type="button"
          class="button"
          onClick={() => clearEditingTicket()}
        >
          Cancel Edit
        </button>
      </Show>
    </form>
  );
}
