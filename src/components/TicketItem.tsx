import {
	type Ticket,
	deleteTicket,
	setEditingTicket,
} from "../stores/ticketStore";

interface TicketItemProps {
	readonly ticket: Ticket;
}

export default function TicketItem({ ticket }: TicketItemProps) {
	const priorityClass = {
		1: "priority-low",
		2: "priority-medium",
		3: "priority-high",
	} as const;

	return (
		<div class="ticket-item">
			<div class={`priority-dot ${priorityClass[ticket.priority]}`} />

			<h3>{ticket.title}</h3>

			<p>{ticket.description}</p>

			<button type="button" class="button" onClick={() => deleteTicket(ticket)}>
				Delete
			</button>

			<button
				type="button"
				class="button"
				onClick={() => setEditingTicket(ticket)}
			>
				Edit
			</button>
		</div>
	);
}
