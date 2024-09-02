import { createStore, produce } from "solid-js/store";

export interface Ticket {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly priority: "1" | "2" | "3";
}

export interface TicketState {
	tickets: Array<Ticket>;
	editingTicket?: Ticket;
	sortPreference: "High to Low" | "Low to High";
}

const ticketStore = createStore<TicketState>({
	tickets: [],
	sortPreference: "High to Low",
});
const [store, setStore] = ticketStore;

export const tickets = () => store.tickets;

export const addTicket = (newTicket: Ticket) => {
	setStore("tickets", store.tickets.length, newTicket);
	sortTickets();
};

export const updateTicket = (updatedTicket: Ticket) => {
	setStore(
		"tickets",
		(ticket) => ticket.id === updatedTicket.id,
		updatedTicket,
	);
	setStore("editingTicket", undefined);
	sortTickets();
};

export const deleteTicket = (deletedTicket: Ticket) => {
	if (store.editingTicket?.id === deletedTicket.id) {
		setStore("editingTicket", undefined);
	}

	setStore("tickets", (currentTickets) =>
		currentTickets.filter(({ id }) => id !== deletedTicket.id),
	);
};

export const editingTicket = () => store.editingTicket;

export const setEditingTicket = (ticket: Ticket) => {
	clearEditingTicket();
	setStore("editingTicket", ticket);
};

export const clearEditingTicket = () => setStore("editingTicket", undefined);

export const sortPreference = () => store.sortPreference;

export const setSortPreference = (
	sortPreference: TicketState["sortPreference"],
) => {
	setStore("sortPreference", sortPreference);
	sortTickets();
};

const sortTickets = () => {
	if (sortPreference() === "High to Low") {
		setStore(
			"tickets",
			produce((currentTickets) =>
				currentTickets.sort((x, y) => y.priority.localeCompare(x.priority)),
			),
		);
	} else {
		setStore(
			"tickets",
			produce((currentTickets) =>
				currentTickets.sort((x, y) => x.priority.localeCompare(y.priority)),
			),
		);
	}
};
