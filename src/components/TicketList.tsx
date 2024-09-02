import { For } from "solid-js";
import type { Ticket } from "../stores/ticketStore";
import TicketItem from "./TicketItem";

interface TickListProps {
	readonly tickets: ReadonlyArray<Ticket>;
}

export default function TicketList({ tickets }: TickListProps) {
	return (
		<div class="ticket-list">
			<For each={tickets}>{(ticket) => <TicketItem ticket={ticket} />}</For>
		</div>
	);
}
