import FusePageCarded from '@fuse/core/FusePageCarded';
import React from 'react';
import FamilyMembersHeader from './FamilyMembersHeader';
import FamilyMembersTable from './FamilyMembersTable';

import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from 'app/fuse-layouts/shared-components/loadingModal/LoadingModal';
import { useTranslation } from "react-i18next";
import withReducer from 'app/store/withReducer';
import reducer from './store';
import {listFamilyMembers} from './store/familyMembersSlice';

function FamilyMembers() {

	const { t } = useTranslation();
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const rowsBody = useSelector(( {FamilyMembers} ) => FamilyMembers.familyMembers);

	React.useEffect(()=>{
			dispatch(listFamilyMembers())
	},[dispatch]);

	const RegisterNewFamilyMembers = (name, address, phone, relationship, birthday)=>{
		dispatch(openLoading())
		phbApi().post("/FamilyMembers/register", {
				Name: name, 
				Address: address, 
				Phone: phone, 
				Relationship: relationship, 
				Birthdate: birthday, 
				UserId: user.uuid
			}).then(res => {
			dispatch(closeLoading())
			dispatch(listFamilyMembers())
		}).
			catch(err => {
				dispatch(closeLoading())
			})
	}

	const DeleteFamilyMembers = (id)=>{
		dispatch(openLoading())
		phbApi().delete("/FamilyMembers/delete/"+id).then(res => {
			dispatch(listFamilyMembers())
			dispatch(closeLoading())
		}).
			catch(err => {
				dispatch(closeLoading())
			})
	}

	const UpdateFamilyMembers = (id, name, address, phone, relationship, birthday)=>{
		dispatch(openLoading())
		phbApi().put("/FamilyMembers/update", {
				Id: id,
				Name: name, 
				Address: address, 
				Phone: phone, 
				Relationship: relationship, 
				Birthdate: birthday, 
				UserId: user.uuid
			}).then(res => {
			dispatch(closeLoading())
			dispatch(listFamilyMembers())
		}).
			catch(err => {
				dispatch(closeLoading())
			})
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<FamilyMembersHeader />}
			content={
				<FamilyMembersTable 
					rowsBody={rowsBody} 
					RegisterNewFamilyMembers={RegisterNewFamilyMembers}
					DeleteFamilyMembers={DeleteFamilyMembers}
					UpdateFamilyMembers={UpdateFamilyMembers} 
				/>
			}
			innerScroll
		/>
	);
}

export default withReducer('FamilyMembers', reducer)(FamilyMembers);