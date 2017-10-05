import React from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Icon, Table, Header, Dropdown, Loader} from 'semantic-ui-react';
import {getCurrencyRate, changeCurrency, changeDate} from './redux';

class App extends React.Component {
  
  componentDidMount() {
    this.props.getCurrencyRate();
  }

  render() {
    return (
      <div>
        <Header as='h1'>Get currency rate app!</Header>
        <Loader {...this.props.currencyApp.rates.length > 1 ? {active: false} : {active: true}} size='massive' />
        <Header as='h3'> Rates for 
          <DatePicker selected={this.props.currencyApp.startDate}
                      onChange={this.props.changeDate} />
        </Header>
        <Table celled size='small' textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Currency</Table.HeaderCell>
              <Table.HeaderCell>Rate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Dropdown defaultValue={this.props.currencyApp.currencies[0].text}
                          selection 
                          options={this.props.currencyApp.currencies} 
                          onChange={this.props.changeCurrency.bind(this)} />
              </Table.Cell>
              <Table.Cell>{this.props.currencyApp.rate1}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Dropdown defaultValue={this.props.currencyApp.currencies[1].text}
                          selection 
                          options={this.props.currencyApp.currencies} 
                          onChange={this.props.changeCurrency.bind(this)} />
              </Table.Cell>
              <Table.Cell>{this.props.currencyApp.rate2}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencyApp: state.currencyApp
});

const mapDispatchToProps = {
  getCurrencyRate,
  changeCurrency,
  changeDate,
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;