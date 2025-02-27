import 'Sass/app/_common/components/platform-switcher.scss';

import { Icon, Text } from '@deriv/components';
import { getPlatformInformation, isMobile } from '@deriv/shared';

import { CSSTransition } from 'react-transition-group';
import { PlatformDropdown } from './platform-dropdown.jsx';
import { PlatformSwitcherLoader } from './Components/Preloader/platform-switcher.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

const PlatformSwitcher = ({
    toggleDrawer,
    is_pre_appstore,
    app_routing_history,
    platform_config,
    is_landing_company_loaded,
    is_logged_in,
    is_logging_in,
}) => {
    const [is_open, setIsOpen] = React.useState(false);

    const is_close_drawer_fired_ref = React.useRef(false);

    React.useEffect(() => {
        if (is_close_drawer_fired_ref.current) {
            if (typeof toggleDrawer === 'function') {
                toggleDrawer();
            }
        }
        is_close_drawer_fired_ref.current = false;
    });

    const closeDrawer = () => {
        setIsOpen(false);
        is_close_drawer_fired_ref.current = true;
    };

    return (is_logged_in || is_logging_in ? !is_landing_company_loaded : app_routing_history.length === 0) ? (
        <div
            data-testid='dt_platform_switcher_preloader'
            className={classNames('platform-switcher__preloader', {
                'platform-switcher__preloader--is-mobile': isMobile(),
            })}
        >
            <PlatformSwitcherLoader is_mobile={isMobile()} speed={3} />
        </div>
    ) : (
        <React.Fragment>
            <div
                data-testid='dt_platform_switcher'
                className={classNames(
                    'platform-switcher',
                    { 'platform-switcher--active': is_open },
                    { 'platform-switcher--is-mobile': isMobile() }
                )}
                onClick={() => setIsOpen(!is_open)}
            >
                <Icon
                    className='platform-switcher__icon'
                    icon={getPlatformInformation(app_routing_history).icon}
                    size={32}
                />
                <Text as='h1' styles={{ lineHeight: '2.4rem' }} weight='bold'>
                    {getPlatformInformation(app_routing_history).header}
                </Text>
                <Icon className='platform-switcher__arrow' icon='IcChevronDownBold' />
            </div>
            <CSSTransition
                mountOnEnter
                appear
                in={is_open}
                classNames={{
                    enterDone: 'platform-dropdown--enter-done',
                }}
                timeout={!isMobile() && is_open ? 0 : 250}
                unmountOnExit
            >
                <PlatformDropdown
                    platform_config={platform_config}
                    closeDrawer={closeDrawer}
                    app_routing_history={app_routing_history}
                    is_pre_appstore={is_pre_appstore}
                />
            </CSSTransition>
        </React.Fragment>
    );
};

PlatformSwitcher.propTypes = {
    platform_config: PropTypes.array,
    toggleDrawer: PropTypes.func,
    app_routing_history: PropTypes.array,
    is_pre_appstore: PropTypes.bool,
    is_landing_company_loaded: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_logging_in: PropTypes.bool,
};

export default withRouter(PlatformSwitcher);
