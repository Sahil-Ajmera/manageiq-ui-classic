import React from 'react';
import { TagGroup, TableListView, GenericGroup } from '@manageiq/react-ui-components/dist/textual_summary';
import TextualSummaryWrapper from '../react/textual_summary_wrapper';
import TableListViewWrapper from '../react/table_list_view_wrapper';
import GenericGroupWrapper from '../react/generic_group_wrapper';
import VmSnapshotFormComponent from '../components/vm-snapshot-form-component';
import FormButtonsRedux from '../forms/form-buttons-redux';
import MiqAboutModal from '../components/miq-about-modal';
import CloudTenantForm from '../components/cloud-tenant-form/cloud-tenant-form';
import ServiceForm from '../components/service-form';
import SetServiceOwnershipForm from '../components/set-service-ownership-form';
import FlavorForm from '../components/flavor-form/flavor-form';
import ImportDatastoreViaGit from '../components/automate-import-export-form/import-datastore-via-git';
import VmServerRelationshipForm from '../components/vm-server-relationship-form';
import CatalogForm from '../components/catalog-form/catalog-form';
import Breadcrumbs from '../components/breadcrumbs';
import { taggingApp } from '@manageiq/react-ui-components/dist/tagging';
import TaggingWrapperConnected from '../components/taggingWrapper';
import '@manageiq/react-ui-components/dist/tagging.css';
import RemoveCatalogItemModal from '../components/remove-catalog-item-modal.jsx';

/**
* Add component definitions to this file.
* example of component definition:
* ManageIQ.component.addReact('ComponentName', props => <ComponentName {...props} />);
*/

ManageIQ.component.addReact('TagGroup', props => <TagGroup {...props} />);
ManageIQ.component.addReact('TableListView', TableListView);
ManageIQ.component.addReact('TableListViewWrapper', TableListViewWrapper);
ManageIQ.component.addReact('GenericGroup', GenericGroup);
ManageIQ.component.addReact('GenericGroupWrapper', GenericGroupWrapper);
ManageIQ.component.addReact('TextualSummaryWrapper', TextualSummaryWrapper);
ManageIQ.component.addReact('VmSnapshotFormComponent', VmSnapshotFormComponent);
ManageIQ.component.addReact('FormButtonsRedux', FormButtonsRedux);
ManageIQ.component.addReact('MiqAboutModal', MiqAboutModal);
ManageIQ.component.addReact('CloudTenantForm', CloudTenantForm);
ManageIQ.component.addReact('ServiceForm', ServiceForm);
ManageIQ.component.addReact('SetServiceOwnershipForm', SetServiceOwnershipForm);
ManageIQ.component.addReact('FlavorForm', FlavorForm);
ManageIQ.component.addReact('ImportDatastoreViaGit', ImportDatastoreViaGit);
ManageIQ.component.addReact('VmServerRelationshipForm', VmServerRelationshipForm);
ManageIQ.component.addReact('CatalogForm', CatalogForm);
ManageIQ.component.addReact('Breadcrumbs', Breadcrumbs);
ManageIQ.component.addReact('TaggingWrapperConnected', TaggingWrapperConnected);
ManageIQ.component.addReact('RemoveCatalogItemModal', RemoveCatalogItemModal);
