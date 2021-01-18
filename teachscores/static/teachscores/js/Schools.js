class Schools extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        fetch(`/schools/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({schools: data.schools});
            console.log(`'Schools': ${this.state.schools}`);
        });
    }
    render(){
        let school_list = <div 
                            className="view_title col-4 rounded-pill"
                            ><h1 
                                align="center" 
                                className="display-4"
                                >No schools. Add some?
                            </h1>
                        </div>

        if (this.state && this.state.schools.length > 0) {
            school_list = <ul></ul>
            this.state.schools.forEach(school => {
                let list_item = <li>{school}</li>
                school_list.appendChild(list_item);
            });
        }
        return school_list;
    }
}

export default Schools