import React, { Component } from 'react';
import * as R from 'ramda';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { API } from 'aws-amplify';

import { PageBodyContainer, PageContainer } from '../sharedComponents/Container';
import { Section } from '../sharedComponents/Section';
import { Row, Col } from "../sharedComponents/Grid";
import { format } from 'date-fns';
import HR from '../sharedComponents/HR';
import { Emphasize } from '../sharedComponents/Typography';

export default class Home extends Component {
  state = {
    totalSlots: 0,
    today: format(new Date(), 'YYYY-MM-DD'),
    slotsRemaining: 0,
    totalCheckinForToday: [],
    isLoading: 'loading'
  };

  async componentDidMount() {
    const totalSlotsResponse = await API.get('parkingTracker', '/checkin/slots', {});

    const totalSlots = R.prop('totalSlots', R.head(totalSlotsResponse));

    const totalCheckinForToday  = await API.get(
      'parkingTracker', `/checkin/${this.state.today}/date`, {}
    );

    const checkedInList = R.filter(x => R.isNil(x.checkoutTime), totalCheckinForToday);

    this.setState({
      totalSlots,
      slotsRemaining: totalSlots - checkedInList.length,
      totalCheckinForToday,
      isLoading: 'complete'
    });
  }
  render() {
    return (
      <PageBodyContainer>
        <PageContainer>
          <Section>
            <Row>
              <Col width={12}><Emphasize>Report for {format(new Date(), 'MMMM DD YYYY')}</Emphasize></Col>
            </Row>
            <Row>
              <Col width={12}><HR /></Col>
            </Row>
            {
              this.state.isLoading === 'isLoading'
              ? 'Loading...'
              : (
                <AutoSizer>
                  {({ width }) => (
                    <Table
                      width={width}
                      height={300}
                      headerHeight={20}
                      rowHeight={30}
                      rowCount={this.state.totalCheckinForToday.length}
                      rowGetter={({ index }) => this.state.totalCheckinForToday[index]}
                    >
                      <Column
                        label='Email'
                        dataKey='userId'
                        width={200}
                      />
                      <Column
                        width={200}
                        label='Checkin Time'
                        dataKey='checkinTime'
                        cellRenderer={({ cellData }) => R.isNil(cellData)
                          ? null
                          : format(cellData, 'hh:mm:ss a')}
                      />
                      <Column
                        width={200}
                        label='Checkout Time'
                        dataKey='checkoutTime'
                        cellRenderer={({ cellData }) => R.isNil(cellData)
                          ? null
                          : format(cellData, 'hh:mm:ss a')}
                      />
                    </Table>
                  )}
                </AutoSizer>
              )
            }

          </Section>
        </PageContainer>
      </PageBodyContainer>
    );
  }
}
