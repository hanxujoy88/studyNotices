//react props和render成员
<script>
let blockBox = React.createClass({
	render: () => {
		return (<div>{'Hello' + this.props.attr}</div>);

	}
});

ReactDOM.reander(<blockBox myattr="world" />, document.getElementById("reactContainer"));
</script>





//react生命周期函数
<script>
	var AddCount = React.createClass({
		getInitialState: function(){
			console.log('1.');
			retrun {count: 1};
		},

		componentWillMount: function() {
			console.log("2.")
		},

		componentDidMount: function() {
			console.log("3.")
		},

		componentDidUpdate: function() {

		},

		handleClick: function(event) {
			this.setState({count: this.state.count +1});
		},
		render: function() {
			return {
				<p>
					{this.state.count} <br/>
					<button onClick={this.handleClick}>add</button>
 				</p>
			}
		} 
	})
	ReactDOM.render(<AddCount/>,document.getElementById('demo'));

</script>

