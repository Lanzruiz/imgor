// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
// Components
import Header from '../../components/Header';
import LocaleString from '../../components/LocaleString';
import Card from '../../components/Card';
// Action
import * as weeksActions from '../../actions/weeks';
// Styles
import './styles.scss';

class StepFour extends React.Component {
  render() {
    const { weeks, selectedWeekId } = this.props;
    const tabsList = [];
    const tabPanels = [];
    const tabListClassName = cx('step-four-tabs__tab-list', {
      'hidden': weeks.length === 1,
    });
    weeks.forEach(({ id, customize_id }) => {
      tabsList.push(
        <Tab key={id} className="step-four-tabs__tab">
          <LocaleString stringKey="week" /> {id}
        </Tab>
      );
      tabPanels.push(
        <TabPanel key={id} className="step-four-tabs__tab-panel">
          <Row>
            <Col>
              <Card
                id={0}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="strength" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={1}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="speed" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={2}
                cardHeader="class"
                color="dark"
                header={<LocaleString stringKey="esl" />}
                label="ages 11-18"
                via={true}
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
            <Col>
              <Card
                id={3}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="mental" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={4}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="nutrition" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={5}
                cardHeader="skip this week"
                color="dark"
                header={<LocaleString stringKey="no_daily_session" />}
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
            <Col>
              <Card
                id={6}
                cardHeader="training"
                color="dark"
                header={<LocaleString stringKey="vision" />}
                label="ages 11-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
              <Card
                id={7}
                cardHeader="class"
                color="dark"
                header={<LocaleString stringKey="SAT/ACT" />}
                label="ages 15-18"
                price="400"
                onClick={this.customizeWeek}
                selectedId={customize_id}
              >
                <div>content here</div>
              </Card>
            </Col>
          </Row>
        </TabPanel>
      );
    });
    return (
      <Container style={{ marginBottom: '65px' }}>
        <Row>
          <Col>
            <Header
              header="step_four.header"
              subHeader="step_four.sub_header"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs
              className="step-four__tabs step-four-tabs"
              selectedTabClassName="step-four-tabs__tab--selected"
              selectedTabPanelClassName="step-four-tabs__tab-tanel--selected"
              selectedIndex={selectedWeekId}
              onSelect={this.selectWeek}
            >
              <TabList className={tabListClassName}>
                {tabsList}
              </TabList>
              {tabPanels}
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }

  customizeWeek = (id) => {
    this.props.weeksActions.customizeWeek(id);
  };

  selectWeek = (id) => {
    this.props.weeksActions.selectWeek(id);
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.weeks.weeks,
    selectedWeekId: state.weeks.selectedWeekId,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    weeksActions: bindActionCreators(weeksActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepFour);
