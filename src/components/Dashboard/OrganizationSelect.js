import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip'
import AppContext, { AppConsumer } from '../../contexts/AppContext';

class OrganizationSelect extends Component {
  handleOrganizationChange = (data) => {
    this.context.selectOrganization(data.value);
  };

  styles = {
    control: (provided) => ({
      ...provided,
      fontSize: '14px',
      cursor: 'pointer',
      lineHeight: '1'
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '14px',
      cursor: 'pointer'
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: '0',
      paddingBottom: '0',
      borderRadius: '4px'
    })
  };

  MenuList = (props) => {
    return (
      <components.MenuList {...props}>
        <div className="organizations-select-actions">
          <Link to="/organizations/new" data-tip="Create New Organization">
            <FontAwesomeIcon icon="plus" />
          </Link>
          <ReactTooltip place="right" type="dark" effect="solid" />
        </div>
        {props.children}
      </components.MenuList>
    );
  };

  render() {
    return (
      <AppConsumer>
        {({organization, organizations}) => {
          return (
            <Select
              options={organizations}
              onChange={this.handleOrganizationChange}
              value={organization.id ? {
                label: organization.name,
                value: organization.id
              } : ''}
              placeholder="Select Organization"
              isClearable={false}
              styles={this.styles}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#eee',
                  primary50: '#eee',
                  primary: '#000',
                },
              })}
              components={{ MenuList: this.MenuList }}
              noOptionsMessage={() => "No Organizations"}
            />
          );
        }}
      </AppConsumer>
    );
  }
}

OrganizationSelect.contextType = AppContext;

export default OrganizationSelect;
