import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import { IMinerSummary } from '../../../core/hooks';
import { formatHashrate } from '../../../core/utils/formatters';
import { VictoryArea } from "victory-native";
import Shimmer from "react-native-shimmer";
import { Title, Paragraph, Divider } from 'react-native-paper';
import { MinerCard } from '../components/miner-card.component';


type PoolViewProps = ViewProps & {
    hashrateHistory: number[];
    fullWidth: number;
    minerData: IMinerSummary | null;
    workingState: string;
    disabled: boolean;
}

export const XMRigView = (props: PoolViewProps):React.ReactElement<PoolViewProps> => {
  
    const RenderHashrateChartVictory = React.useCallback(() => (
        <View style={{left: 0, bottom: 0, width: props.fullWidth}}>
            <Shimmer opacity={0.8} tilt={30} direction="left" pauseDuration={2500}>
              <VictoryArea  width={props.fullWidth}  padding={0} height={70} data={props.hashrateHistory} style={{data: { fill: 'rgba(134, 65, 244)'}}} interpolation="natural" standalone={true} />
            </Shimmer>
        </View>
    ), [props.fullWidth, props.hashrateHistory]);


    return (
        <>
            <View style={styles.row}>
                <MinerCard title="Mode" style={{ flex: 2, marginRight: 10 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.workingState}</Paragraph>
                </MinerCard>
                <MinerCard title="Algo" style={{ flex: 2 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.algo}</Paragraph>
                </MinerCard>
            </View>
            <Title>Hashrate</Title>
            <View style={styles.row}>
                <MinerCard 
                    title="10s"
                    subTitle={`${formatHashrate(props.minerData?.hashrate.total[0])[1] || 'H'}/s`}
                    style={{ flex: 2, marginRight: 10 }}
                    disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{formatHashrate(props.minerData?.hashrate.total[0])[0]}</Paragraph>
                </MinerCard>
                <MinerCard
                    title="60s"
                    subTitle={`${formatHashrate(props.minerData?.hashrate.total[1])[1] || 'H'}/s`}
                    style={{ flex: 2, marginRight: 10 }}
                    disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{formatHashrate(props.minerData?.hashrate.total[1])[0]}</Paragraph>
                </MinerCard>
                <MinerCard
                    title="15m"
                    subTitle={`${formatHashrate(props.minerData?.hashrate.total[2])[1] || 'H'}/s`}
                    style={{ flex: 2, marginRight: 10 }}
                    disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{formatHashrate(props.minerData?.hashrate.total[2])[0]}</Paragraph>
                </MinerCard>
                <MinerCard
                    title="max"
                    subTitle={`${formatHashrate(props.minerData?.hashrate.highest)[1] || 'H'}/s`}
                    style={{ flex: 2 }}
                    disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{formatHashrate(props.minerData?.hashrate.highest)[0]}</Paragraph>
                </MinerCard>
            </View>
            <View style={styles.row}>
                <MinerCard title="Live Hashrate" style={{ flex: 1 }} disabled={props.disabled} wrapInContent={false}>
                    <RenderHashrateChartVictory />
                </MinerCard>
            </View>
            <Divider style={{marginTop: 2, marginBottom: 10}} />
            <View style={styles.row}>
                <MinerCard title="Accepted" style={{ flex: 2, marginRight: 10 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.results.shares_good}</Paragraph>
                </MinerCard>
                <MinerCard title="Difficult" style={{ flex: 2 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.results.diff_current}</Paragraph>
                </MinerCard>
            </View>
            <View style={styles.row}>
                <MinerCard title="Threads" style={{ flex: 2, marginRight: 10 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.cpu.threads}</Paragraph>
                </MinerCard>
                <MinerCard title="Avg Time" style={{ flex: 2 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.results.avg_time}</Paragraph>
                </MinerCard>
            </View>
            <View style={[styles.row]}>
                <MinerCard title="Free Mem" style={{ flex: 2, marginRight: 10 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.resources.memory.free}</Paragraph>
                </MinerCard>
                <MinerCard title="Res. Mem" style={{ flex: 2 }} disabled={props.disabled}>
                    <Paragraph adjustsFontSizeToFit numberOfLines={1}>{props.minerData?.resources.memory.resident_set_memory}</Paragraph>
                </MinerCard>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginBottom: 10
    }
});