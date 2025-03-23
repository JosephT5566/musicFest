import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

const StyledTableOfDay = styled('div')({
    width: `calc(100vw - 1em - 3.8em)`,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
});

const StyledTimelineBtnContainer = styled('div')({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
});

const StyledTimelineBtn = styled('button')(({ theme }) => ({
    position: 'absolute',
    border: 'none',
    borderRadius: '0.5em',
    padding: '0.5em',
    zIndex: 1,
    '&:hover': {
        cursor: 'pointer',
        filter: 'brightness(0.95)',
    },
    '&:focus': {
        outline: '0',
    },
}));

const StyledBtnContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25em',
    color: theme.palette.text.primary,
}));

const StyledBtnTitle = styled('div')({
    fontWeight: 'bold',
    fontSize: '16px',
    width: '100%',
});

interface ShowItem extends IArtist {
    stageName: string;
    layer: number;
    itemColor: SimplePaletteColorOptions;
    overlappingCount: number;
}

interface TimeLineButtonProps {
    megaStartTime: Moment;
    showInfo: ShowItem;
}

const TimeLineButton: React.FC<TimeLineButtonProps> = ({ megaStartTime, showInfo }) => {
    const { name, startTime, endTime, itemColor, stageName, layer, overlappingCount } = showInfo;
    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
    const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
    
    // Calculate width based on overlapping events
    const width = 100 / overlappingCount;
    const leftPosition = (layer * width);

    return (
        <StyledTimelineBtnContainer
            style={{
                top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
            }}
        >
            <StyledTimelineBtn
                style={{
                    left: `${leftPosition}%`,
                    width: `${width}%`,
                    minHeight: `${height * SCALE_UNIT}rem`,
                    height: `${height * SCALE_UNIT}rem`,
                    backgroundColor: itemColor.main,
                }}
            >
                <StyledBtnContent>
                    <StyledBtnTitle>{name}</StyledBtnTitle>
                    <div>{stageName}</div>
                    <div>{startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm')}</div>
                </StyledBtnContent>
            </StyledTimelineBtn>
        </StyledTimelineBtnContainer>
    );
};

interface TimeLineOfDayV2Props {
    startTime: Moment;
    endTime: Moment;
    stages: IStage[];
    day: number;
    selectedDay: number;
}

export default function TimeLineOfDayV2(props: TimeLineOfDayV2Props) {
    const { startTime, endTime, stages, day, selectedDay } = props;
    const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;
    
    // Create a map to track overlapping events
    const timeSlotMap = new Map<number, Set<string>>();
    
    // Process stages and calculate overlapping events
    const processedStages: ShowItem[][] = stages
        .map((stage, index) =>
            stage.artists.map((artist) => ({
                stageName: stage.name,
                itemColor: palette.stage[index as keyof typeof palette.stage],
                layer: 0,
                overlappingCount: 1,
                ...artist,
            }))
        )
        .filter((items) => items.length > 0);

    // First pass: Record all time slots
    processedStages.forEach(stageArtists => {
        stageArtists.forEach(artist => {
            const startMinutes = moment(artist.startTime).diff(startTime, 'minutes') / 10;
            const endMinutes = moment(artist.endTime).diff(startTime, 'minutes') / 10;
            
            for (let i = Math.floor(startMinutes); i <= Math.ceil(endMinutes); i++) {
                if (!timeSlotMap.has(i)) {
                    timeSlotMap.set(i, new Set());
                }
                timeSlotMap.get(i)?.add(artist.id);
            }
        });
    });

    // Second pass: Calculate overlapping counts and layers
    const finalStages = processedStages.map(stageArtists => {
        return stageArtists.map(artist => {
            const startMinutes = moment(artist.startTime).diff(startTime, 'minutes') / 10;
            const endMinutes = moment(artist.endTime).diff(startTime, 'minutes') / 10;
            
            let maxOverlap = 1;
            let layer = 0;
            const overlappingArtists = new Set<string>();

            // Find maximum overlap and collect overlapping artists
            for (let i = Math.floor(startMinutes); i <= Math.ceil(endMinutes); i++) {
                const slotArtists = timeSlotMap.get(i) || new Set();
                if (slotArtists.size > maxOverlap) {
                    maxOverlap = slotArtists.size;
                }
                slotArtists.forEach(id => {
                    if (id !== artist.id) {
                        overlappingArtists.add(id);
                    }
                });
            }

            // Assign layer based on existing layers of overlapping artists
            const usedLayers = new Set<number>();
            overlappingArtists.forEach(id => {
                const existingArtist = processedStages.flat().find(a => a.id === id);
                if (existingArtist) {
                    usedLayers.add(existingArtist.layer);
                }
            });

            while (usedLayers.has(layer)) {
                layer++;
            }

            return {
                ...artist,
                overlappingCount: maxOverlap,
                layer
            };
        });
    });

    return (
        <StyledTableOfDay
            style={{
                display: day === selectedDay ? '' : 'none',
                height: `${height * SCALE_UNIT}rem`,
            }}
        >
            {finalStages.map((stage) =>
                stage.map((item) => (
                    <TimeLineButton
                        megaStartTime={startTime}
                        key={item.id}
                        showInfo={item}
                    />
                ))
            )}
        </StyledTableOfDay>
    );
}