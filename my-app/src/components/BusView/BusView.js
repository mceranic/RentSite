import React, { Component, Fragment } from "react";
import Navigation from "../StaticPage/Navigation/Navigation";
import MobileNavigation from "../StaticPage/MobileNavigation/MobileNavigation";
import "./BusView.css";
import { MenuItem, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
let counter = 0;
function createData(
	fromLocation,
	toLocation,
	timeOfDeparture,
	timeOfArrival,
	distance,
	price,
	company
) {
	counter += 1;
	return {
		id: counter,
		fromLocation,
		toLocation,
		timeOfDeparture,
		timeOfArrival,
		distance,
		price,
		company
	};
}

const rows = [
	{ id: "fromLocation", label: "Od" },
	{ id: "toLocation", label: "Do" },
	{ id: "timeOfDeparture", label: "Vrijeme polaska" },
	{ id: "timeOfArrival", label: "Vrijeme dolaska" },
	{ id: "distance", label: "Udaljenost" },
	{ id: "price", label: "Cijena" },
	{ id: "company", label: "Prevoznik" }
];
class ApartmentView extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		selected: [],
		data: [],
		selectedFirstLocation: null,
		selectedSecondLocation: null,
		page: 0
	};

	onSelectFirstLocation = location => {
		this.setState({
			selectedFirstLocation: location
		});
	};
	onSelectSecondLocation = location => {
		this.setState({
			selectedSecondLocation: location
		});
	};
	componentDidMount() {
		/*     this.setState({ loading: true });
		*/
		
		if (
			this.state.selectedFirstLocation == null &&
			this.state.selectedSecondLocation == null
			) {
				
				axios("http://localhost:9000/api/transports/")
				.then(res => {
					console.log("Response", res.data)
					let fetchedData = res.data.map(r =>
						createData(
							r.fromLocation,
							r.toLocation,
							r.timeOfDeparture,
							r.timeOfArrival,
							r.distance,
							r.price,
							r.company
						)
					);
					this.setState({ data: fetchedData });
					console.log(this.state.data);
					console.log("nakon mapiranja",this.state.data);
				})
				.catch(err => this.setState({ loading: false }));
		}
	}
	componentDidUpdate() {
		

		if (
			this.state.selectedFirstLocation != null &&
			this.state.selectedSecondLocation != null
		) {

			axios("http://localhost:9000/api/transports/location/" + this.state.selectedFirstLocation + "/" + this.state.selectedSecondLocation)
				.then(res => {
					let fetchedData = res.data.map(r =>
						createData(
							r.fromLocation,
							r.toLocation,
							r.timeOfDeparture,
							r.timeOfArrival,
							r.distance,
							r.price,
							r.company
							)
					);
					this.setState({ data: fetchedData });
				})
				.catch(err => this.setState({ loading: false }));
			}
		}
		
		render() {
			console.log("hi table", this.state.data)
			return (
				<div>
				<div className="header2">
					<Navigation />
					<MobileNavigation />
					<h1>
						Pronađi autobus
        </h1>
					
					<TextField
						style={{
							backgroundColor: "white",
							color: "black",
							width: "200px",
							marginRight:"15px",
							height: "70px"
						}}
						variant="outlined"
						id="grad"
						width="200px"
						select
						label="Odaberi početnu lokaciju"
						value={this.selectedFirstLocation}
						onChange={e => {
							this.onSelectFirstLocation(e.target.value)
						}}
						color="white"
					>
						<MenuItem key={6} value={6}>
							{"Sarajevo"}
						</MenuItem>
						<MenuItem key={7} value={7}>
							{"Tuzla"}
						</MenuItem>
						<MenuItem key={8} value={8}>
							{"Mostar"}
						</MenuItem>
						<MenuItem key={9} value={9}>
							{"Banja Luka"}
						</MenuItem>
						<MenuItem key={10} value={10}>
							{"Doboj"}
						</MenuItem>
						<MenuItem key={11} value={11}>
							{"Zenica"}
						</MenuItem>
						<MenuItem key={12} value={12}>
							{"Bijeljina"}
						</MenuItem>
					</TextField>
					<TextField
						style={{
							backgroundColor: "white",
							color: "black",
							width: "200px",

							height: "70px"
						}}
						variant="outlined"
						id="grad"
						width="200px"
						select
						label="Odaberi krajnju lokaciju"
						value={this.selectedSecondLocation}
						onChange={e => {
							this.onSelectSecondLocation(e.target.value)
						}}
						color="white"
					>
						<MenuItem key={6} value={6}>
							{"Sarajevo"}
						</MenuItem>
						<MenuItem key={7} value={7}>
							{"Tuzla"}
						</MenuItem>
						<MenuItem key={8} value={8}>
							{"Mostar"}
						</MenuItem>
						<MenuItem key={9} value={9}>
							{"Banja Luka"}
						</MenuItem>
						<MenuItem key={10} value={10}>
							{"Doboj"}
						</MenuItem>
						<MenuItem key={11} value={11}>
							{"Zenica"}
						</MenuItem>
						<MenuItem key={12} value={12}>
							{"Bijeljina"}
						</MenuItem>
					</TextField>
				</div>
				<div >
					<Table aria-labelledby="tableTitle">
						<TableHead style={{ backgroundColor: "rgb(57, 54, 67, 0.9)" }}>
							<TableRow>
								{rows.map(
									row => (
										<TableCell
											style={{
												color: "white"
											}}
											key={row.id}

										>
											{row.label}

										</TableCell>
									),
									this
								)}
							</TableRow>
						</TableHead>

						<TableBody>

							{this.state.data.map(n => {
								return (
									<TableRow
										hover
										key={n.id}
									>
										<TableCell component="th" scope="row">
											{n.fromLocation.name}
										</TableCell>

										<TableCell>{n.toLocation.name}</TableCell>
										<TableCell>{n.timeOfDeparture}</TableCell>
										<TableCell>{n.timeOfArrival}</TableCell>
										<TableCell>{n.distance}</TableCell>
										<TableCell>{n.price}</TableCell>
										<TableCell>{n.company}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>

				</div>


			</div>
		);
	}
}
export default ApartmentView;
