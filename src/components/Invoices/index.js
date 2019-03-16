import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Invoices.css';
import AppContext from '../../contexts/AppContext';
import InvoiceApi from '../../api/invoice.api';
import Confirm from '../../utils/Confirm';
import { toast } from 'react-toastify';

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

  handleDestroyInvoice = async (invoiceId) => {
    const invoices = this.state.invoices;
    const invoiceIndex = invoices.findIndex(invoice => invoice.id === invoiceId);
    const invoiceNumber = invoices[invoiceIndex].number;

    Confirm({
      title: 'Please confirm',
      message: `Are you sure you want to delete invoice #${invoiceNumber}?`,
      buttons: [
        {
          label: 'Delete',
          className: 'btn btn-danger',
          onClick: async () => {
            try {
              const res = await InvoiceApi.destroy(this.context.organization.id, invoiceId);
              if (res.status === 200) {
                invoices.splice(invoiceIndex, 1);

                this.setState({
                  invoices
                });

                toast.success(`Deleted invoice #${invoiceNumber}`);
              }
            } catch (err) {
              toast.error(err.message);
              throw err;
            }
          }
        },
        {
          label: 'Cancel',
          onClick: false
        }
      ]
    });
  };

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
                  <div className="actions-col">
                    Status
                  </div>
                  <div className="actions-col actions-col-right">
                    <button
                      onClick={() => { this.handleDestroyInvoice(invoice.id) }}
                      className="invoice-item-btn invoice-item-btn-danger"
                    >
                      <FontAwesomeIcon icon="trash-alt" />
                    </button>
                  </div>
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
