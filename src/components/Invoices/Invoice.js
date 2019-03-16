import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './Invoice.css';
import AppContext, { AppConsumer } from '../../contexts/AppContext';
import InvoiceApi from '../../api/invoice.api';
import InvoiceEditor from './InvoiceEditor';

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      invoice: {}
    };
  }

  async componentDidMount() {
    try {
      const res = await InvoiceApi.get(this.context.organization.id, this.props.match.params.id);

      if (res.data.data.invoice) {
        this.setState({
          initialized: true,
          invoice: res.data.data.invoice
        });
      } else if (res.data.data.errors && res.data.message) {
        toast.error(res.data.message);
      }
      
    } catch (err) {
      toast.error(err.message);
    }
  }
  
  render() {
    return (
      <AppConsumer>
        {({ organization }) => {
          return (
            <div className="invoice">
              <div className="container">
                {!this.state.initialized &&
                  <div>Loading</div>
                }

                {this.state.initialized &&
                  <div className="invoice-content">
                    <InvoiceEditor
                      invoice={this.state.invoice}
                      organization={organization}
                    />
                  </div>
                }
              </div>
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}

Invoice.contextType = AppContext;

export default Invoice;
