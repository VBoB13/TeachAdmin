import Schools from "./Schools"

class MenuItemIcon extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            icon: props.icon,
        };
        this.renderIcon = this.renderIcon.bind(this);
    }
    renderIcon(){
        let icon;
        if(this.state.icon === "schools"){
            icon = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" height="50" fill="currentColor" 
                    className="bi bi-building" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694L1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                    </svg>
        } else if(this.state.icon === "homerooms"){
            icon = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" height="50" fill="currentColor" 
                    className="bi bi-house-door" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"/>
                        <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    </svg>
        } else if(this.state.icon === "subjects"){
            icon = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" height="50" fill="currentColor" 
                    className="bi bi-book" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 2.828v9.923c.918-.35 2.107-.692 3.287-.81 1.094-.111 2.278-.039 3.213.492V2.687c-.654-.689-1.782-.886-3.112-.752-1.234.124-2.503.523-3.388.893zm7.5-.141v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
        }
        else{
            icon = <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" height="50" fill="currentColor" 
                    className="bi bi-people" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
        }
        return icon;
    }
    render(){
        return(
            this.renderIcon()
        );
    }
}


class MenuItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.item,
        };
        this.renderUnit = this.renderUnit.bind(this);
    }
    renderUnit(unit){
        history.pushState({unit: unit}, "", `/${unit}/`);
        if(unit === "schools"){
            ReactDOM.render(
                <Schools />,
                document.getElementById('content_block')
            );
        } else {
            ReactDom.render(
                <Index />,
                document.getElementById("content_block")
            );
        }
    }
    render(){
        return(
            <div
            id={this.state.item}
            align="center"
            className="col-2 menuItem"
            onClick={ () => this.renderUnit(this.state.item) }>
                <MenuItemIcon icon={this.state.item} />
            </div>
        );
    }
}


class MenuRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            row: parseInt(props.row),
        };
        this.getRowContents = this.getRowContents.bind(this);
    }
    getRowContents() {
        if(this.state.row === 1){
            return(
                <div className="row justify-content-center">
                    <MenuItem item="schools" />
                    <MenuItem item="homerooms" />
                </div>
            );
        }
        else if(this.state.row === 2){
            return(
                <div className="row justify-content-center">
                    <MenuItem item="subjects" />
                    <MenuItem item="students" />
                </div>
            );
        }
        else{
            return(
                <div className="row justify-content-center">
                    <span className="col-12">
                        No more menu for you.
                    </span>
                </div>
            );
        }
        
    }
    render(){
        return(
            this.getRowContents()
        );
    }
}


class MainMenu extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="col-6 justify-content-center">
                <MenuRow row="1" />
                <MenuRow row="2" />
            </div>
        );
    }
}


class Index extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <MainMenu />
        );
    }
}

window.onpopstate = function(event){
    let final_unit = <Index />;
    if(event.state.unit != null){
        let unit = event.state.unit[0].toUpperCase() + `${event.state.unit.slice(1)}`;

        if(unit === "Schools") final_unit = <Schools />;

    }
    ReactDOM.render(
        final_unit,
        document.getElementById('content_block')
    );
}

export default Index