import { Show } from "solid-js";
import "./App.css";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import {
	type TicketState,
	setSortPreference,
	sortPreference,
	tickets,
} from "./stores/ticketStore";
import "./styles.css";

export default function App() {
	return (
		<div class="App">
			<div class="container">
				<h1>Bug Blaster</h1>

				<TicketForm />

				<Show when={tickets().length > 0}>
					<div class="results">
						<h2>All Tickets</h2>

						<select
							value={sortPreference()}
							onChange={(e) => {
								setSortPreference(
									e.target.value as TicketState["sortPreference"],
								);
							}}
						>
							<option value="High to Low">High to Low</option>
							<option value="Low to High">Low to High</option>
						</select>

						<TicketList />
					</div>
				</Show>
			</div>
		</div>
	);
}
