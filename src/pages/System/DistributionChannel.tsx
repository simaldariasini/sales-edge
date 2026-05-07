import { type Dispatch, type SetStateAction } from "react";
import { csvIcon as CsvIcon, excelIcon as ExcelIcon, pdfIcon as PdfIcon, threedotIcon as ThreeDotIcon } from "../../icons/icon";
import type { DistributionChannel as DistributionChannelType } from "./data";
import { EyeIcon, PencilIcon, RefreshIcon, SearchIcon } from "./SystemIcons";

interface DistributionChannelProps {
  filteredDistributionChannels: DistributionChannelType[];
  distributionSearch: string;
  setDistributionSearch: Dispatch<SetStateAction<string>>;
  handleRefresh: () => void;
  setShowDistributionModal: Dispatch<SetStateAction<boolean>>;
  showExports: boolean;
  setShowExports: Dispatch<SetStateAction<boolean>>;
  showDistributionDetails: (channel: DistributionChannelType) => void;
  setEditDistributionChannel: Dispatch<SetStateAction<DistributionChannelType | null>>;
  setShowEditDistributionModal: Dispatch<SetStateAction<boolean>>;
}

export default function DistributionChannel({ filteredDistributionChannels, distributionSearch, setDistributionSearch, handleRefresh, setShowDistributionModal, showExports, setShowExports, showDistributionDetails, setEditDistributionChannel, setShowEditDistributionModal }: DistributionChannelProps) {
  return (
    <section className="distribution-page">
      <div className="distribution-header">
        <div className="organization-title-row">
          <h1>Distribution Channels (5)</h1>
          <button className="refresh-button" aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </button>
        </div>
    
        <div className="distribution-actions" onMouseDown={(event) => event.stopPropagation()}>
          <label className="distribution-search">
            <input
              value={distributionSearch}
              onChange={(event) => setDistributionSearch(event.target.value)}
              placeholder="Search Distribution Channels..."
              aria-label="Search distribution channels"
            />
            <SearchIcon />
          </label>
          <button className="new-button add-button" onClick={() => setShowDistributionModal(true)}>
            <span>+</span> Add
          </button>
          <button
            className="more-button"
            aria-label="Export options"
            onClick={() => setShowExports((value) => !value)}
          >
            <ThreeDotIcon />
          </button>
    
          {showExports && (
            <div className="export-menu">
              <button className="export-item">
                <ExcelIcon /> Export to Excel
              </button>
              <button className="export-item">
                <PdfIcon /> Export to PDF
              </button>
              <button className="export-item">
                <CsvIcon /> Export to CSV
              </button>
            </div>
          )}
        </div>
      </div>
    
      <article className="distribution-card">
        <table>
          <thead>
            <tr>
              <th>S No</th>
              <th>Org Code</th>
              <th>Org Name</th>
              <th>Distribution Code</th>
              <th>Distribution Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistributionChannels.map((channel) => (
              <tr key={channel.distributionCode}>
                <td>{channel.id}</td>
                <td>{channel.orgCode}</td>
                <td>{channel.orgName}</td>
                <td>{channel.distributionCode}</td>
                <td>{channel.distributionName}</td>
                <td>{channel.status}</td>
                <td>
                  <div className="table-actions">
                    <button aria-label="View distribution channel" onClick={() => showDistributionDetails(channel)}>
                      <EyeIcon />
                    </button>
                    <button
                      aria-label="Edit distribution channel"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditDistributionChannel(channel);
                        setShowEditDistributionModal(true);
                      }}
                    >
                      <PencilIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
