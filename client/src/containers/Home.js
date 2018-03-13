import React, { Component } from 'react';
import { format } from 'date-fns';
import { API } from 'aws-amplify';
import * as R from 'ramda';

import { PageBodyContainer, PageContainer, CardContainer, CardBody, CardFooter } from '../sharedComponents/Container';
import { Section } from '../sharedComponents/Section';
import { Row, Col } from "../sharedComponents/Grid";
import { Emphasize } from '../sharedComponents/Typography';
import Button from '../sharedComponents/Button';
import HR from '../sharedComponents/HR';

export default class Home extends Component {
  state = {
    totalSlots: 0,
    today: format(new Date(), 'YYYY-MM-DD'),
    checkinTime: null,
    checkoutTime: null,
    slotsRemaining: 0,
    isLoading: 'loading'
  };

  async componentDidMount() {
    const totalSlotsResponse = await API.get('parkingTracker', '/checkin/slots', {});

    const totalSlots = R.prop('totalSlots', R.head(totalSlotsResponse));

    const totalCheckinForToday  = await API.get(
      'parkingTracker', `/checkin/${this.state.today}/date`, {}
    );

    const checkedInList = R.filter(x => R.isNil(x.checkoutTime), totalCheckinForToday);

    const userCheckinDetails = await API.post(
      'parkingTracker', `/checkin/${this.state.today}/user`, { body: { email: this.props.email } }
    );

    this.setState({
      totalSlots,
      checkinTime: R.isNil(R.prop('checkinTime', userCheckinDetails))
        ? null
        : format(R.prop('checkinTime', userCheckinDetails), 'hh:mm:ss a'),
      checkoutTime: R.isNil(R.prop('checkoutTime', userCheckinDetails))
        ? null
        : format(R.prop('checkoutTime', userCheckinDetails), 'hh:mm:ss a'),
      slotsRemaining: totalSlots - checkedInList.length,
      isLoading: 'complete'
    });
  }

  async checkin() {
    const checkinTime = new Date().valueOf();

    await API.post(
      'parkingTracker',
      '/checkin',
      {
        body: {
          email: this.props.email,
          checkinDate: this.state.today,
          checkinTime
        }
      }
    );

    const totalCheckinForToday  = await API.get(
      'parkingTracker', `/checkin/${this.state.today}/date`, {}
    );

    const checkedInList = R.filter(x => R.isNil(x.checkoutTime), totalCheckinForToday);

    this.setState({
      checkinTime: format(checkinTime, 'hh:mm:ss a'),
      checkoutTime: null,
      slotsRemaining: this.state.totalSlots - checkedInList.length
    });
  }

  async checkout() {
    const checkoutTime = new Date().valueOf();

    await API.put(
      'parkingTracker',
      `/checkin/${this.state.today}`,
      {
        body: {
          email: this.props.email,
          checkoutTime
        }
      }
    );
    const totalCheckinForToday  = await API.get(
      'parkingTracker', `/checkin/${this.state.today}/date`, {}
    );

    const checkedInList = R.filter(x => R.isNil(x.checkoutTime), totalCheckinForToday);

    console.log('on checkout', R.reject(x => !R.isNil(x.checkoutTime), totalCheckinForToday));
    this.setState({
      checkoutTime: format(checkoutTime, 'hh:mm:ss a'),
      slotsRemaining: this.state.totalSlots - checkedInList.length
    });
  }

  render () {
    return (
      <PageBodyContainer>
        <PageContainer>
          <Section>
            <Row>
              <Col width={12}><Emphasize>Welcome {this.props.email}</Emphasize></Col>
            </Row>
            <Row>
              <Col width={12}><HR /></Col>
            </Row>
            {
              this.state.isLoading === 'complete'
                ? (
                <CardContainer>
                  <CardBody>
                    <Row>
                      <Col width={12}><strong>{format(new Date(), 'MMMM DD YYYY')}</strong></Col>
                    </Row>
                    <Row>
                      <table>
                        <tbody>
                        <tr>
                          <td width="50%">Slots Available</td>
                          <td width="50%">{this.state.totalSlots}</td>
                        </tr>
                        <tr>
                          <td width="50%">Slots Remaining</td>
                          <td width="50%">{this.state.slotsRemaining}</td>
                        </tr>
                        <tr>
                          <td width="50%">Checkin Time</td>
                          <td width="50%">{this.state.checkinTime}</td>
                        </tr>
                        <tr>
                          <td width="50%">Checkout Time</td>
                          <td width="50%">{this.state.checkoutTime}</td>
                        </tr>
                        </tbody>
                      </table>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Row>
                      {
                        this.state.slotsRemaining > 0
                          ? (
                          [
                            <Col width={2} key={1}><Button variant="secondary"
                                                           onClick={() => this.checkin()}>Checkin</Button></Col>,
                            <Col width={10} key={2}><Button variant="default"
                                                            onClick={() => this.checkout()}>Checkout</Button></Col>
                          ]

                        )
                          : (
                          [
                            <Col width={10} key={12}>Sorry, all parking slots are taken!</Col>
                          ]
                        )
                      }
                    </Row>
                    <Row>

                    </Row>
                  </CardFooter>
                </CardContainer>
              )
              : 'Loading...'
            }
          </Section>
        </PageContainer>
      </PageBodyContainer>
    );
  }
}
