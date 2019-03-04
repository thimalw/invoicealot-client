import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Invoices.css';
import AppContext from '../../contexts/AppContext';
import InvoiceApi from '../../api/invoice.api';

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    };
  }

  componentDidMount() {
    this.loadInvoices();
  }

  loadInvoices = async () => {
    try {
      const res = await InvoiceApi.list(this.context.organization.id);

      if (res.data.data.invoices) {
        this.setState({
          invoices: res.data.data.invoices
        });
      }
    } catch (err) {
      throw err; // TODO: handle error
    }
  };
  
  render() {
    return (
      <div className="invoices">
        <div className="container">
          <div className="invoice-list">
            {this.state.invoices.map(invoice =>
              <div
                className="invoice-list-item"
                key={invoice.id}
              >
                <Link
                  className="invoice-item-body"
                  to={`/invoices/${invoice.id}`}
                >
                  <div className="row">
                    <div className="col">
                      <div className="label">Invoice Number</div>
                      <div className="value">{invoice.number}</div>
                    </div>
                    <div className="col">
                      <div className="label">Customer</div>
                      <div className="value">GhostLabX</div>
                    </div>
                    <div className="col col-right text-right">
                      <div className="label">Amount</div>
                      <div className="value">{invoice.total ? invoice.total : '0.00'}</div>
                    </div>
                  </div>
                </Link>
                <div className="invoice-item-actions">

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Invoices.contextType = AppContext;

export default Invoices;
