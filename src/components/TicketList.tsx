import { For } from "solid-js";
import { tickets } from "../stores/ticketStore";
import TicketItem from "./TicketItem";

export default function TicketList() {
  return (
    <div class="ticket-list">
      <For each={tickets()}>{(ticket) => <TicketItem ticket={ticket} />}</For>
    </div>
  );
}
