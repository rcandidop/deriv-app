import IconTradeTypes from '../../icon-trade-types';
import PropTypes from 'prop-types';
import React from 'react';
import { isVanillaContract } from '@deriv/shared';

const ContractTypeCell = ({ getContractTypeDisplay, is_high_low, multiplier, type }) => (
    <div className='dc-contract-type'>
        <div className='dc-contract-type__type-wrapper'>
            <IconTradeTypes
                type={is_high_low && !isVanillaContract(type) ? `${type.toLowerCase()}_barrier` : type.toLowerCase()}
                className='category-type'
                size={24}
            />
        </div>
        <div className='dc-contract-type__type-label'>
            <div>{getContractTypeDisplay(type, is_high_low) || ''}</div>
            {multiplier && <div className='dc-contract-type__type-label-multiplier'>x{multiplier}</div>}
        </div>
    </div>
);

ContractTypeCell.propTypes = {
    getContractTypeDisplay: PropTypes.func,
    is_high_low: PropTypes.bool,
    multiplier: PropTypes.number,
    type: PropTypes.string,
};

export default ContractTypeCell;
